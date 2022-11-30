import './App.scss';
import {evaluate} from 'mathjs'
import {useState} from 'react'

function App() {

  const dataCal = ['+','-','*','/']

  const dataNum = [1,2,3,4,5,6,7,8,9,0]

  const [data,setData] = useState([])
  const [ans,setAns] = useState(0)
  const [answer,setAnswer] = useState(0)
  const [err,setErr] = useState(false)

  const handleClickNumberBtn = number => {
    setData(prev => [...prev,number])
  }

  const handleClickCalculation = str => {
    setData(prev => [...prev,str])
  }

  const check = (calc1,calc2) => {
    return (calc1 === "+" || calc1 === '-') && (calc2 ==="+" || calc2 === '-')
  }

  const handleClickAnswerBtn = () => {
    let total = 0
    let value = ''
    let cal = null
    let isAns = false
    if(isNaN(data[0]) && data[0] !== 'Ans' && data[0] !== '+' && data[0] !== '-')
      setErr(true)
    else{
      setErr(false)
      data.forEach((item,index) => {
        //nam sau 1 ky tu tinh toan khong phai la 1 so
        if(cal && isNaN(item) && item !== 'Ans' && !check(cal,item)){
          setErr(true)
          return;
        }
        //nam sau ans khong phai la 1 ky tu tinh toan



        else if((!isNaN(item) && isAns) || (isAns && item=== 'Ans' )){
          setErr(true)
          return;
        }

        //nam sau so la Ans
        else if(!cal && item === 'Ans' && index > 0){
          setErr(true)
          console.log(3)
          return;
        }

        else{
          console.log('count')
          if(isNaN(item))
            if(item === 'Ans'){
              value += `${ans}`
              isAns = true
              cal = null
              console.log('nook1')
            }
            else{
              value += `${item}`
              cal = item
              isAns = false
              console.log('nook2')
            }
          else{
            isAns = false;
            cal = null
            value += `${item}`
          }
        }
      })

      if(cal){
        console.log(4)
        setErr(true)
        return;
      }
      total = evaluate(value)
      setAnswer(total)
      setAns(total)
    }
    
  }

  const handleClickAns = () => {
    setData(prev => [...prev,'Ans'])
  }

  const handleClickDeleteBtn = () => {
    setData(prev => prev.filter((item,index) => index < prev.length - 1))
  }

  const handleClickClearBtn = () => {
    setAnswer(0)
    setData([])
  }

  return (
    <div className="App">
      <div className="calc">
        <div className='screen'>
          <div className='screenValue'>{data.map(item => item)}</div>
          <div className='screenAnswer'>{err ? 'Error' : answer}</div>
        </div>

        <div className='clearBtns'>
          <div className='clearBtn' onClick={handleClickDeleteBtn}>Delete</div>
          <div className='clearBtn' onClick={handleClickClearBtn}>Clear</div>
        </div>

        <div className='screenBtns'>
          <div className='screenBtnsNumber'>
            {
              dataNum.map((item,index) => (

                <div className='screenBtn' key={index} onClick={() => handleClickNumberBtn(item)}>{item}</div>
              ))
            }
            <div className='screenBtn' onClick={handleClickAns}>Ans</div>
            <div className='screenBtn' onClick={handleClickAnswerBtn}>=</div>
          </div>
          <div className='screenBtnsCalculation'>
            {
              dataCal.map((item,index) => (
                <div className='screenBtn' key={index} onClick={() => handleClickCalculation(item)}>{item}</div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
