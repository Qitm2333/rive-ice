import { useState, useEffect, useCallback } from 'react'
import { useRive, useStateMachineInput } from '@rive-app/react-webgl2'
import './App.css'

function App() {
  const [showDebug, setShowDebug] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  
  // 检测屏幕尺寸变化
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // 背景图片设置
  const [bgColor, setBgColor] = useState('#737787')
  const [bgPosX, setBgPosX] = useState(50)
  const [bgPosY, setBgPosY] = useState(28)
  const [bgScale, setBgScale] = useState(39)
  const [bgBrightness, setBgBrightness] = useState(65)
  const [bgContrast, setBgContrast] = useState(200)
  
  // Rive辉光
  const [riveGlow, setRiveGlow] = useState(19)
  
  // Rive阴影
  const [shadowBlur, setShadowBlur] = useState(0)
  const [shadowOffsetY, setShadowOffsetY] = useState(3)
  const [shadowOpacity, setShadowOpacity] = useState(2)
  

  // Rive动画设置 - 桌面端默认值
  const [riveWidth, setRiveWidth] = useState(22)  // vw
  const [riveHeight, setRiveHeight] = useState(55) // vh
  const [riveOffsetX, setRiveOffsetX] = useState(0) // vw
  const [riveOffsetY, setRiveOffsetY] = useState(7) // vh
  
  // 移动端参数
  const [mobileRiveWidth, setMobileRiveWidth] = useState(55) // vw
  const [mobileRiveHeight, setMobileRiveHeight] = useState(35) // vh  
  const [mobileRiveOffsetX, setMobileRiveOffsetX] = useState(0)
  const [mobileRiveOffsetY, setMobileRiveOffsetY] = useState(0.7)
  const [mobileBgScale, setMobileBgScale] = useState(90)
  const [mobileBgPosY, setMobileBgPosY] = useState(35)
  
  // 根据设备类型获取实际使用的参数
  const actualRiveWidth = isMobile ? mobileRiveWidth : riveWidth
  const actualRiveHeight = isMobile ? mobileRiveHeight : riveHeight
  const actualRiveOffsetX = isMobile ? mobileRiveOffsetX : riveOffsetX
  const actualRiveOffsetY = isMobile ? mobileRiveOffsetY : riveOffsetY
  const actualBgScale = isMobile ? mobileBgScale : bgScale
  const actualBgPosY = isMobile ? mobileBgPosY : bgPosY

  const [showRive, setShowRive] = useState(false)

  const { rive, RiveComponent } = useRive({
    src: '/torras_ice_cube.riv',
    stateMachines: 'State Machine 1',
    autoplay: true,
  })

  const outInput = useStateMachineInput(rive, 'State Machine 1', 'Out')
  const chargingLongTimeInput = useStateMachineInput(rive, 'State Machine 1', 'ChargingLongTime')
  const chargingInput = useStateMachineInput(rive, 'State Machine 1', 'Charging')
  const welcomeInput = useStateMachineInput(rive, 'State Machine 1', 'Welcome')

  const fireInput = (input, name) => {
    if (input) {
      setShowRive(true)
      input.fire()
      console.log(`${name} fired`)
    }
  }


  return (
    <div className="app-container">
      <div 
        className="background-layer"
        style={{
          backgroundColor: bgColor,
          backgroundPosition: `${bgPosX}% ${actualBgPosY}%`,
          backgroundSize: `${actualBgScale}%`,
          filter: `brightness(${bgBrightness}%) contrast(${bgContrast}%)`
        }}
      />
      <div 
        className="rive-container" 
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: `${actualRiveWidth}vw`,
          height: `${actualRiveHeight}vh`,
          transform: `translate(-50%, -50%) translate(${actualRiveOffsetX}vw, ${actualRiveOffsetY}vh)`,
          filter: `${riveGlow > 0 ? `drop-shadow(0 0 ${riveGlow}px rgba(255,255,255,0.8)) drop-shadow(0 0 ${riveGlow * 2}px rgba(100,200,255,0.5))` : ''} drop-shadow(0 ${shadowOffsetY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity / 100}))`,
          opacity: showRive ? 0.9 : 0,
          pointerEvents: showRive ? 'auto' : 'none'
        }}
      >
        <RiveComponent />
      </div>
      
      <div className="controls">
        <button onClick={() => fireInput(welcomeInput, 'Welcome')}>Welcome</button>
        <button onClick={() => fireInput(chargingInput, 'Charging')}>Charging</button>
        <button onClick={() => fireInput(chargingLongTimeInput, 'ChargingLongTime')}>ChargingLongTime</button>
        <button onClick={() => fireInput(outInput, 'Out')}>Out</button>
      </div>

      <button className="debug-toggle" onClick={() => setShowDebug(!showDebug)}>
        {showDebug ? '隐藏调试' : '显示调试'}
      </button>

      {showDebug && (
        <div className="debug-panel">
          <h3>背景图片</h3>
          <label>
            背景色: {bgColor}
            <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} />
          </label>
          <label>
            X位置: {bgPosX}%
            <input type="range" min="0" max="100" value={bgPosX} onChange={e => setBgPosX(Number(e.target.value))} />
          </label>
          <label>
            Y位置: {bgPosY}%
            <input type="range" min="0" max="100" value={bgPosY} onChange={e => setBgPosY(Number(e.target.value))} />
          </label>
          <label>
            缩放: {bgScale}%
            <input type="range" min="10" max="200" value={bgScale} onChange={e => setBgScale(Number(e.target.value))} />
          </label>
          <label>
            明度: {bgBrightness}%
            <input type="range" min="50" max="200" value={bgBrightness} onChange={e => setBgBrightness(Number(e.target.value))} />
          </label>
          <label>
            对比度: {bgContrast}%
            <input type="range" min="50" max="200" value={bgContrast} onChange={e => setBgContrast(Number(e.target.value))} />
          </label>

          <h3>Rive动画</h3>
          <label>
            宽度: {riveWidth}vw
            <input type="range" min="5" max="80" value={riveWidth} onChange={e => setRiveWidth(Number(e.target.value))} />
          </label>
          <label>
            高度: {riveHeight}vh
            <input type="range" min="5" max="100" value={riveHeight} onChange={e => setRiveHeight(Number(e.target.value))} />
          </label>
          <label>
            X偏移: {riveOffsetX}vw
            <input type="range" min="-50" max="50" value={riveOffsetX} onChange={e => setRiveOffsetX(Number(e.target.value))} />
          </label>
          <label>
            Y偏移: {riveOffsetY}vh
            <input type="range" min="-50" max="50" value={riveOffsetY} onChange={e => setRiveOffsetY(Number(e.target.value))} />
          </label>
          <label>
            辉光: {riveGlow}px
            <input type="range" min="0" max="50" value={riveGlow} onChange={e => setRiveGlow(Number(e.target.value))} />
          </label>
          
          <h3>阴影</h3>
          <label>
            模糊: {shadowBlur}px
            <input type="range" min="0" max="100" value={shadowBlur} onChange={e => setShadowBlur(Number(e.target.value))} />
          </label>
          <label>
            Y偏移: {shadowOffsetY}px
            <input type="range" min="0" max="100" value={shadowOffsetY} onChange={e => setShadowOffsetY(Number(e.target.value))} />
          </label>
          <label>
            透明度: {shadowOpacity}%
            <input type="range" min="0" max="100" value={shadowOpacity} onChange={e => setShadowOpacity(Number(e.target.value))} />
          </label>
          
          <div className="debug-output">
            <code>
              {`背景: position ${bgPosX}% ${bgPosY}%, size ${bgScale}%, brightness ${bgBrightness}%, contrast ${bgContrast}%`}<br/>
              {`Rive: ${riveWidth}x${riveHeight}px, offset(${riveOffsetX}, ${riveOffsetY})`}
            </code>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
