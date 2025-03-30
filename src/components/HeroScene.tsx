import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import '../styles/components/HeroScene.scss';

// 导入模块化的Three.js组件
import { SceneManager } from '../three/core/SceneManager';
import { LightSetup } from '../three/utils/LightSetup';
import { UIMarker } from '../three/objects/UIMarker';

// 定义材质切换信息结构
interface MaterialSwapInfo {
  mesh: THREE.Mesh;
  materialIndex: number; // 材质在网格材质数组中的索引
  dayMaterial: THREE.Material;
  nightMaterial: THREE.Material;
}

const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 初始化场景管理器
    const sceneManager = new SceneManager(containerRef.current);
    
    // 设置灯光
    const lightSetup = new LightSetup(sceneManager.scene);
    
    // 创建UI标记点数组
    const markers: UIMarker[] = [];
    const markerAnimations: (() => void)[] = [];
    
    // 创建第一个标记点
    const marker1 = new UIMarker(
      sceneManager.scene,
      new THREE.Vector3(8, 3, -15), // 位置
      '#00C853', // 绿色
      0.5
    );
    markers.push(marker1);
    markerAnimations.push(marker1.addAnimation());
    
    // 创建第二个标记点
    const marker2 = new UIMarker(
      sceneManager.scene,
      new THREE.Vector3(12, 3, -8), // 位置
      '#00C853', // 绿色
      0.5 // 大小
    );
    markers.push(marker2);
    markerAnimations.push(marker2.addAnimation());
    
    // 创建第三个标记点
    const marker3 = new UIMarker(
      sceneManager.scene,
      new THREE.Vector3(-12, 3, -18), // 位置
      '#00C853', // 绿色
      0.6 // 大小
    );
    markers.push(marker3);
    markerAnimations.push(marker3.addAnimation());
    
    // 创建第四个标记点
    const marker4 = new UIMarker(
      sceneManager.scene,
      new THREE.Vector3(5, 3, 6), // 位置
      '#00C853', // 绿色
      0.6
    );
    markers.push(marker4);
    markerAnimations.push(marker4.addAnimation());
    
    // Three.js Clock for animation updates
    const clock = new THREE.Clock();
    let mixer: THREE.AnimationMixer | null = null;
    
    // --- 自发光控制相关 ---
    const emissiveMaterials: THREE.Material[] = [];
    const lightPositions: THREE.Vector3[] = [];
    const dynamicLights: THREE.PointLight[] = [];
    const EMISSIVE_SUFFIX = '_EmissiveControl';
    const NIGHT_EMISSIVE_INTENSITY = 5; // 夜晚自发光强度
    const DYNAMIC_LIGHT_INTENSITY = 5; // 动态点光源强度
    const DYNAMIC_LIGHT_DISTANCE = 8;    // 动态点光源影响距离
    const DYNAMIC_LIGHT_COLOR = 0xffcc88; // 动态点光源颜色 (暖黄)

    // 尝试加载模型
    const loader = new GLTFLoader();
    console.log("开始加载模型...", '/models/sceneModel.glb');
    
    // 加载模型
    loader.load(
      '/models/sceneModel.glb',
      (gltf) => {
        console.log("模型加载成功!", gltf);
        
        const model = gltf.scene;
        const addedMaterials = new Set<THREE.Material>(); // 仅用于跟踪材质，避免重复添加到emissiveMaterials
        const tempWorldPos = new THREE.Vector3(); // 用于计算世界坐标

        // 遍历模型，查找需要控制自发光的材质和位置
        console.log("--- 开始扫描自发光材质 ---");
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const materials = Array.isArray(child.material) ? child.material : [child.material];
            
            materials.forEach(mat => {
              if (mat && mat.name && mat.name.endsWith(EMISSIVE_SUFFIX)) {
                // 标记这个网格需要创建灯光
                child.getWorldPosition(tempWorldPos);
                lightPositions.push(tempWorldPos.clone()); 
                console.log(`  - 为网格 ${child.name || '未命名'} 添加光源位置: (${tempWorldPos.x.toFixed(2)}, ${tempWorldPos.y.toFixed(2)}, ${tempWorldPos.z.toFixed(2)})`);

                // 检查是否已添加此材质到控制列表
                if (!addedMaterials.has(mat)) {
                  console.log(`发现自发光控制材质: ${mat.name}`);
                  emissiveMaterials.push(mat);
                  addedMaterials.add(mat);
                  
                  // 设置初始自发光强度为0
                  if (mat instanceof THREE.MeshStandardMaterial) {
                    mat.emissiveIntensity = 0;
                  }
                }
              }
              // 设置基础渲染属性 (所有材质)
              if (mat instanceof THREE.MeshStandardMaterial) {
                mat.roughness = 0.4;
                mat.metalness = 0.4;
                mat.envMapIntensity = 0.8;
              }
            });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
        console.log(`--- 自发光材质扫描结束 --- 找到 ${emissiveMaterials.length} 个材质, 将创建 ${lightPositions.length} 个光源`);

        // 根据找到的位置创建动态点光源
        lightPositions.forEach(pos => {
            const pointLight = new THREE.PointLight(
                DYNAMIC_LIGHT_COLOR,
                0, // 初始强度为0
                DYNAMIC_LIGHT_DISTANCE
            );
            pointLight.position.copy(pos);
            pointLight.castShadow = false; // 这些小光源通常不产生阴影以提高性能
            sceneManager.addObject(pointLight);
            dynamicLights.push(pointLight);
        });
        console.log(`创建了 ${dynamicLights.length} 个动态点光源`);
        
        sceneManager.addObject(model);
        
        // 播放模型动画
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            const action = mixer!.clipAction(clip);
            action.play();
          });
          console.log(`播放 ${gltf.animations.length} 个模型动画`);
        } else {
          console.log("模型不包含动画。");
        }
        
        // 相机位置查看模型
        sceneManager.camera.position.set(10, 30, 30);
        sceneManager.camera.lookAt(model.position);
        sceneManager.controls.update();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% 模型加载中...');
      },
      (error) => {
        console.error('模型加载失败');
        console.error('错误详情:', error);
      }
    );
    
    // 为窗口大小变化添加监听
    window.addEventListener('resize', sceneManager.onWindowResize);
    
    // 为用户交互添加鼠标事件
    const onMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      
      // 计算鼠标位置相对于场景的标准化坐标 (-1 到 +1)
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / containerRef.current.clientWidth) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / containerRef.current.clientHeight) * 2 + 1;
      
      // 稍微移动场景中的点光源，跟随鼠标位置
      lightSetup.updatePointLight(mouseX * 10, 10, mouseY * 10);
    };
    
    containerRef.current.addEventListener('mousemove', onMouseMove);
    
    // 日夜状态切换阈值
    const NIGHT_THRESHOLD = 0.2;
    let isNight = false; // 跟踪当前状态避免重复设置
    
    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      
      // 获取时间增量和总时间
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();
      
      // 更新日夜循环
      lightSetup.updateDayNightCycle(elapsedTime);
      
      // 更新模型动画混合器
      if (mixer) {
        mixer.update(delta);
      }
      
      // 更新标记点动画
      markerAnimations.forEach(animateMarker => {
        if (animateMarker) {
          animateMarker();
        }
      });
      
      // --- 执行自发光和动态光照切换 ---
      const sunFactor = lightSetup.getSunHeightFactor();
      const shouldBeNight = sunFactor < NIGHT_THRESHOLD;
      
      if (shouldBeNight !== isNight) {
          isNight = shouldBeNight;
          console.log(isNight ? "切换到夜晚状态" : "切换到白天状态");
          
          // 更新自发光材质强度
          emissiveMaterials.forEach(mat => {
             // 只有 MeshStandardMaterial 有 emissiveIntensity
             if (mat instanceof THREE.MeshStandardMaterial) {
                 const targetIntensity = isNight ? NIGHT_EMISSIVE_INTENSITY : 0;
                 mat.emissiveIntensity = targetIntensity;
             }
          });
          
          // 更新动态点光源强度
          dynamicLights.forEach(light => {
             const targetIntensity = isNight ? DYNAMIC_LIGHT_INTENSITY : 0;
             light.intensity = targetIntensity;
          });
      }
      
      // 渲染场景
      sceneManager.render();
    };
    
    animate();
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', sceneManager.onWindowResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', onMouseMove);
      }
      
      // 清理资源
      markers.forEach(marker => marker.dispose());
      // 清理动态光源
      dynamicLights.forEach(light => {
          sceneManager.removeObject(light);
          light.dispose();
      });
      // 清理可能存在的动画混合器
      if (mixer) {
          mixer.stopAllAction();
      }
      sceneManager.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="hero-scene" />;
};

export default HeroScene; 