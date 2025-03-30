import * as THREE from 'three';

export class LightSetup {
  ambient: THREE.AmbientLight;
  hemisphere: THREE.HemisphereLight;
  directional: THREE.DirectionalLight;
  spot: THREE.SpotLight;
  point: THREE.PointLight;
  
  // 日夜循环参数
  cycleDuration: number = 120; // 2分钟
  dayColor = new THREE.Color(0xffffff);
  sunsetColor = new THREE.Color(0xffaa55);
  nightColor = new THREE.Color(0x223344); // 深蓝色
  hemisphereDayColor = new THREE.Color(0xffffff);
  hemisphereNightColor = new THREE.Color(0x445566);
  hemisphereGroundDayColor = new THREE.Color(0xb0bec5);
  hemisphereGroundNightColor = new THREE.Color(0x222233);

  // 当前太阳高度因子 (0 = night, 1 = noon)
  private currentSunHeightFactor: number = 1.0; // 初始化为中午状态

  constructor(scene: THREE.Scene) {
    // 环境光 - 提供柔和的全局照明
    this.ambient = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(this.ambient);
    
    // 半球光 - 模拟天空和地面的反射光
    this.hemisphere = new THREE.HemisphereLight(0xffffff, 0xb0bec5, 0.3);
    this.hemisphere.position.set(0, 20, 0);
    scene.add(this.hemisphere);
    
    // 方向光 - 模拟太阳光，产生清晰的阴影
    this.directional = new THREE.DirectionalLight(0xffffff, 0.8);
    this.directional.position.set(20, 30, 20); // 初始位置调高一些
    this.directional.castShadow = true;
    
    // 高质量阴影设置 - 扩大范围消除摩尔纹
    const shadowRange = 80; // 原来是40 (left/right/top/bottom为+/-20), 现在扩大一倍
    this.directional.shadow.mapSize.width = 4096;  // 增加阴影贴图分辨率
    this.directional.shadow.mapSize.height = 4096;
    this.directional.shadow.camera.near = 0.1;
    this.directional.shadow.camera.far = 100; // 稍微增加远裁剪面
    this.directional.shadow.camera.left = -shadowRange;
    this.directional.shadow.camera.right = shadowRange;
    this.directional.shadow.camera.top = shadowRange;
    this.directional.shadow.camera.bottom = -shadowRange;
    this.directional.shadow.bias = -0.0001;  // 减少阴影失真
    this.directional.shadow.normalBias = 0.05;  // 增加法线偏移，尝试解决摩尔纹
    
    scene.add(this.directional);
    
    // 聚光灯 - 用作全局光源
    this.spot = new THREE.SpotLight(0xffffff, 0.6);
    this.spot.position.set(-10, 30, 10);
    this.spot.angle = Math.PI / 4;
    this.spot.penumbra = 0.3;  // 增加边缘柔和度
    this.spot.castShadow = true;
    
    // 高质量聚光灯阴影设置
    this.spot.shadow.mapSize.width = 4096;
    this.spot.shadow.mapSize.height = 4096;
    this.spot.shadow.camera.near = 0.5;
    this.spot.shadow.camera.far = 100;
    this.spot.shadow.bias = -0.0005;
    this.spot.shadow.normalBias = 0.05;
    
    scene.add(this.spot);
    
    // 点光源 - 用于强调和高光
    this.point = new THREE.PointLight(0x00ff00, 0.8, 100);
    this.point.position.set(0, 10, 0);
    this.point.castShadow = true;
    
    // 高质量点光源阴影设置
    this.point.shadow.mapSize.width = 1024;
    this.point.shadow.mapSize.height = 1024;
    this.point.shadow.camera.near = 0.1;
    this.point.shadow.camera.far = 50;
    this.point.shadow.bias = -0.0005;
    this.point.shadow.normalBias = 0.05;
    
    scene.add(this.point);
    
    // 初始化光照到中午状态
    this.updateDayNightCycle(this.cycleDuration / 4); // 传递一个代表中午的时间点
  }
  
  // 更新日夜循环
  updateDayNightCycle(elapsedTime: number): void {
    const cycleProgress = (elapsedTime % this.cycleDuration) / this.cycleDuration; // 0 to 1
    // 调整相位使 elapsedTime = 0 时对应中午 (angle = PI/2)
    const angle = cycleProgress * Math.PI * 2 + Math.PI / 2; 

    // 计算太阳高度因子 (0=地平线, 1=最高点)
    this.currentSunHeightFactor = (Math.sin(angle) + 1) / 2; // 使用调整后的角度

    // ---- 更新方向光 (太阳) ----
    // 位置: 模拟太阳轨迹
    const radius = 40;
    this.directional.position.x = Math.cos(angle) * radius;
    this.directional.position.y = Math.sin(angle) * radius * 0.7 + 10; // 太阳Y轴在一定范围内变化
    this.directional.position.z = Math.sin(angle) * radius * 0.5; // 给Z轴一些变化

    // 强度: 中午最强，夜晚接近0
    const minSunIntensity = 0.1;
    const maxSunIntensity = 1.5;
    this.directional.intensity = THREE.MathUtils.lerp(minSunIntensity, maxSunIntensity, this.currentSunHeightFactor);

    // 颜色: 根据太阳高度插值
    const noonColor = this.dayColor;
    const horizonColor = this.sunsetColor;
    if (this.currentSunHeightFactor > 0.1) { // 白天和日出/日落
        // 使用smoothstep插值，让颜色变化更自然
        const colorFactor = THREE.MathUtils.smoothstep(this.currentSunHeightFactor, 0.1, 0.8);
        this.directional.color.lerpColors(horizonColor, noonColor, colorFactor);
    } else { // 夜晚
        this.directional.color.lerpColors(this.nightColor, horizonColor, this.currentSunHeightFactor / 0.1);
    }
    this.directional.castShadow = this.currentSunHeightFactor > 0.05; // 只有白天有阴影

    // ---- 更新环境光 ----
    const minAmbientIntensity = 0.1;
    const maxAmbientIntensity = 0.5;
    this.ambient.intensity = THREE.MathUtils.lerp(minAmbientIntensity, maxAmbientIntensity, this.currentSunHeightFactor);
    this.ambient.color.lerpColors(this.nightColor, this.dayColor, this.currentSunHeightFactor);

    // ---- 更新半球光 ----
    const minHemiIntensity = 0.1;
    const maxHemiIntensity = 0.4;
    this.hemisphere.intensity = THREE.MathUtils.lerp(minHemiIntensity, maxHemiIntensity, this.currentSunHeightFactor);
    this.hemisphere.color.lerpColors(this.hemisphereNightColor, this.hemisphereDayColor, this.currentSunHeightFactor); // 天空颜色
    this.hemisphere.groundColor.lerpColors(this.hemisphereGroundNightColor, this.hemisphereGroundDayColor, this.currentSunHeightFactor); // 地面反射颜色

    // ---- 更新聚光灯和点光源 (可选，如果希望它们也受影响) ----
    // 这里保持聚光灯和点光源强度不变，作为场景的固定光源
    // 如果需要，也可以类似地调整它们的强度或颜色
    // this.spot.intensity = ...;
    // this.point.intensity = ...;
  }

  // 获取当前的太阳高度因子
  getSunHeightFactor(): number {
      return this.currentSunHeightFactor;
  }

  // 更新点光源位置，用于鼠标交互效果
  updatePointLight(x: number, y: number, z: number): void {
    this.point.position.set(x, y, z);
  }
  
  // 创建光源辅助工具 - 用于调试
  createHelpers(scene: THREE.Scene): void {
    const dirHelper = new THREE.DirectionalLightHelper(this.directional, 2);
    scene.add(dirHelper);
    
    const spotHelper = new THREE.SpotLightHelper(this.spot);
    scene.add(spotHelper);
    
    const pointHelper = new THREE.PointLightHelper(this.point, 1);
    scene.add(pointHelper);
  }
} 