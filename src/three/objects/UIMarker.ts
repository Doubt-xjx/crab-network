import * as THREE from 'three';

export class UIMarker {
  mesh: THREE.Object3D; // 改为Object3D因为不再使用球体
  position: THREE.Vector3;
  color: THREE.Color;
  size: number;
  visible: boolean;
  pulseEffect: THREE.Mesh | null;
  
  constructor(
    scene: THREE.Scene,
    position: THREE.Vector3 = new THREE.Vector3(0, 5, 0),
    color: string = '#00C853', // 使用绿色
    size: number = 0.5
  ) {
    this.position = position;
    this.color = new THREE.Color(color);
    this.size = size;
    this.visible = true;
    this.pulseEffect = null;
    
    // 创建一个空的组作为父对象
    this.mesh = new THREE.Group();
    this.mesh.position.copy(this.position);
    
    // 添加到场景
    scene.add(this.mesh);
    
    // 创建一个指向线作为指示器
    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, -this.size * 6, 0)
    ]);
    
    const lineMaterial = new THREE.LineBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: 0.7
    });
    
    const line = new THREE.Line(lineGeometry, lineMaterial);
    this.mesh.add(line);
    
    // 自动添加脉冲动画效果
    this.createPulseEffect();
  }
  
  // 设置位置
  setPosition(x: number, y: number, z: number): void {
    this.position.set(x, y, z);
    this.mesh.position.copy(this.position);
  }
  
  // 设置颜色
  setColor(color: string): void {
    this.color = new THREE.Color(color);
    
    // 更新子对象的颜色
    this.mesh.children.forEach(child => {
      if (child instanceof THREE.Line && 
          child.material instanceof THREE.LineBasicMaterial) {
        child.material.color = this.color;
      }
      
      if (child instanceof THREE.Mesh && 
          child.material instanceof THREE.MeshBasicMaterial) {
        child.material.color = this.color;
      }
    });
  }
  
  // 设置大小
  setSize(size: number): void {
    this.size = size;
    this.mesh.scale.set(size * 2, size * 2, size * 2);
  }
  
  // 设置可见性
  setVisible(visible: boolean): void {
    this.visible = visible;
    this.mesh.visible = visible;
  }
  
  // 创建脉冲效果
  createPulseEffect(): void {
    // 创建一个平面环作为脉冲效果
    const pulseGeometry = new THREE.RingGeometry(this.size * 0.8, this.size, 32);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      color: this.color,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide
    });
    
    this.pulseEffect = new THREE.Mesh(pulseGeometry, pulseMaterial);
    this.pulseEffect.rotation.x = Math.PI / 2; // 水平放置
    this.pulseEffect.scale.set(1, 1, 1);
    this.mesh.add(this.pulseEffect);
  }
  
  // 添加动画，返回动画函数
  addAnimation(): () => void {
    if (!this.pulseEffect) {
      this.createPulseEffect();
    }
    
    // 动画函数会在外部的动画循环中调用
    const animatePulse = () => {
      if (!this.pulseEffect || !this.visible) return;
      
      this.pulseEffect.scale.x += 0.05;
      this.pulseEffect.scale.y += 0.05;
      
      if (this.pulseEffect.material instanceof THREE.MeshBasicMaterial) {
        this.pulseEffect.material.opacity -= 0.02;
      }
      
      if (this.pulseEffect.scale.x > 4) {
        this.pulseEffect.scale.set(1, 1, 1);
        if (this.pulseEffect.material instanceof THREE.MeshBasicMaterial) {
          this.pulseEffect.material.opacity = 0.7;
        }
      }
    };
    
    // 返回动画函数，让外部调用
    return animatePulse;
  }
  
  // 销毁标记点
  dispose(): void {
    // 清理子对象
    this.mesh.children.forEach(child => {
      if (child instanceof THREE.Mesh) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      } else if (child instanceof THREE.Line) {
        if (child.geometry) child.geometry.dispose();
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      }
    });
  }
} 