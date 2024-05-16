import './index.css'
import avatar from './assets/img/logo192.png'
import { useRef, useState, useEffect, createContext, useContext } from 'react'
import { useWindowScroll } from './hooks/useWindowScroll'
const formatDate = (time) => {
  return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
}
// 依赖的数据
const data = {
  // hot: 热度排序  time: 时间排序
  tabs: [
    {
      id: 1,
      name: '热度',
      type: 'hot'
    },
    {
      id: 2,
      name: '时间',
      type: 'time'
    }
  ],
  active: 'hot',
  list: [
    {
      id: 1,
      author: '刘德华',
      comment: '给我一杯忘情水',
      time: new Date('2021-10-10 09:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 1
    },
    {
      id: 2,
      author: '周杰伦',
      comment: '哎哟，不错哦',
      time: new Date('2021-10-11 09:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: 0
    },
    {
      id: 3,
      author: '五月天',
      comment: '不打扰，是我的温柔',
      time: new Date('2021-10-11 10:09:00'),
      // 1: 点赞 0：无态度 -1:踩
      attitude: -1
    }
  ]
}

// 函数式组件
const HelloFn = () => {
  console.log('HelloFn')
  const handlerClick = () => {
    console.log('click')
  }
  return (
    <div>
      HelloFn
      <button onClick={handlerClick}>点击我</button>
    </div>
  )
}

// 获取额外参数
const TestComponent = () => {
  const list = [
    {
      id: 1001,
      name: 'react'
    },
    {
      id: 1002,
      name: 'vue'
    }
  ]

  const [count, setCount] = useState(0)
  const onDel = (item, e) => {
    console.log(item, e)
    setCount(prevCount => prevCount + 1); // 使用前一个状态值来更新
    console.log('Item deleted, updated count:', count); // 注意：这里的log可能不会立刻反映出最新的count值，因为setState是异步的
  }
  return (
    <div className='test'>
        <ul>
          {list.map(item => <li key={item.id}>{item.name}
            <button onClick={(e) => onDel(item, e)}>删除</button>
          </li>)}
        </ul>
        <div>
          计数器{count}
        </div>
    </div>
  )
}


const InputComponent = () => {
  const [value, setValue] = useState('')
  const changeHandler = (e) => {
    setValue((prevValue) => {
      console.log('e.target.value', e.target.value);
      console.log('prevValue', prevValue);
      // 使用新的值进行计算或处理
      return e.target.value;
    });
  }
  return (
    <div>
      <input type="text" value={value} onChange={changeHandler}/>
    </div>
  )
}

const Timer = () => {
  const [time, setTime] = useState(1)
  const timer = useRef(null)
  const refDom = useRef(null)
  const clickAdd = () => {
    window.clearInterval(timer.current);
    timer.current = window.setTimeout(() => {
      setTime(time + 1);
    }, 5000);
    console.log(timer.current);
  }
  const clickGetDom = () => {
    console.log(refDom.current)
  }
  return (
    <div ref={refDom}>
      <p>{time}</p>
      <button onClick={clickAdd}>add</button>
      <button onClick={clickGetDom}>getDom</button>
    </div>
  )
}

// 熟悉react父子组件穿参
const Children = ({list, onDel}) => {
  return (
    <div>
      <p>我是子组件</p>
      <ul>
        {list.map(item => <li key={item.id}>{item.name}<button onClick={() => onDel(item.id)}>删除</button></li>)}
      </ul>
    </div>
  )
}

const Parent = () => {
  const [list, setList] = useState([
    { id: 1, name: '超级好吃的棒棒糖', price: 18.8, info: '开业大酬宾，全场8折' },
    { id: 2, name: '超级好吃的大鸡腿', price: 34.2, info: '开业大酬宾，全场8折' },
    { id: 3, name: '超级无敌的冰激凌', price: 14.2, info: '开业大酬宾，全场8折' }
  ])
  const onDel = (id) => {
    setList(list.filter(item => item.id !== id))
  }
  return (
    <div>
      <h1>我是父组件</h1>
      <Children list={list} onDel={onDel}></Children>
    </div>
    
  )
}

const Context = createContext()

function Foo() {  
  return <div>Foo <Bar/></div>
}

function Bar() {  
  // 底层组件通过useContext函数获取数据  
  const name = useContext(Context)  
  return <div>Bar {name}</div>
}

function App() {
  const [count, setCount] = useState(0)  
  const [name, setName] = useState('zs') 
  const scrollY = useWindowScroll()
  console.log('scrollY', scrollY)
  useEffect(() => {    
      console.log('副作用执行了')  
  }, [count])  
  return (
    <div className="App">
      <h1>demo</h1>
      <div className='comment-container'>
        <div className="comment-head">
          <span>5 评论</span>
        </div>
      </div>
      <div className="tabs-order">
        <ul className="sort-container">
         {data.tabs.map(item => <li key={item.id} className={item.type === data.active ? 'on' : ''}>按{ item.name}排序</li>)}
        </ul>
      </div>
      {/* 添加评论 */}
      <div className="comment-send">
          <div className="user-face">
            <img className="user-head" src={avatar} alt="" />
          </div>
          <div className="textarea-container">
            <textarea
              cols="80"
              rows="5"
              placeholder="发条友善的评论"
              className="ipt-txt"
            />
            <button className="comment-submit">发表评论</button>
          </div>
          <div className="comment-emoji">
            <i className="face"></i>
            <span className="text">表情</span>
          </div>
      </div>
      {/* 评论列表 */}
      <div className="comment-list">
        {
          data.list.map(item => (
            <div className="list-item" key={item.id}>
              <div className="user-face">
                <img className="user-head" src={avatar} alt="" />
              </div>
              <div className="comment">
                <div className="user">{ item.author}</div>
                <p className="text">{ item.comment }</p>
                <div className="info">
                  <span className="time">{ formatDate(item.time)}</span>
                  <span className={item.attitude === 1 ? 'like liked' : 'like'}>
                    <i className="icon" />
                  </span>
                  <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                    <i className="icon" />
                  </span>
                  <span className="reply btn-hover">删除</span>
                </div>
              </div>
            </div>
          ))
        }
        <div className="list-item">
          <div className="comment">
            <div className="user">尤雨溪</div>
            <p className="text">前排吃瓜</p>
            <div className="info">
              <span className="time">2021-10-08 09:05:00</span>
              <span className="like liked">
                <i className="icon" />
              </span>
              <span className="hate hated">
                <i className="icon" />
              </span>
              <span className="reply btn-hover">删除</span>
            </div>
          </div>
        </div>
      </div>
      <HelloFn></HelloFn>
      <TestComponent></TestComponent>
      <InputComponent></InputComponent>
      <Timer></Timer>
      <Parent></Parent>
      <button onClick={() => { setCount(count + 1) }}>{count}</button>      
      <button onClick={() => { setName('cp') }}>{name}</button>   
      {/* // 顶层组件通过Provider 提供数据     */}
      <Context.Provider value={name}>     
          <div><Foo/></div>    
      </Context.Provider>  
    </div>
  )
}
export default App
