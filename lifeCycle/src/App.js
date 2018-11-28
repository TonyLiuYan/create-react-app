import React, { Component } from 'react';

class App extends Component {


  constructor(props, context) {
    //只要组件存在constructor,就必要要写super,否则会导致this指向错误
    //在类的方法中按照如下方式使用  this.props  this.context
    //组件中props只读不可变，state可变
    super(props, context)


    //定义state
    this.state = {
      state1: true,
      state2: 'abc',
      state3: 123,
      someThings: 1
    }

    //定义全局变量
    this.var1 = ''
    this.var2 = 101
  }

  componentWillMount() {
    //组件刚经历constructor,初始完数据
    //组件还未进入render
    //组件还未渲染完成
    //dom还未渲染

    //componentWillMount 一般用的比较少，更多的是用在服务端渲染

    //在组件挂载到DOM前调用，且只会被调用一次，在这边调用this.setState不会引起组件重新渲染，也可以把写在这边的内容提前到constructor()中，所以项目中很少用。

  }

  componentDidMount() {
    //组件第一次渲染完成，此时dom节点已经生成
    //可以在这里调用ajax请求,返回数据setState后组件会重新渲染

    //组件挂载到DOM后调用，且只会被调用一次
  }
  componentWillReceiveProps(nextProps) {
    //在接受父组件改变后的props需要重新渲染组件时用到的比较多
    //nextProps:通过对比nextProps和this.props，将nextProps setState为当前组件的state，从而重新渲染组件

    //此方法只调用于props引起的组件更新过程中，参数nextProps是父组件传给当前组件的新props。
    //但父组件render方法的调用不能保证重传给当前组件的props是有变化的，
    //所以在此方法中根据nextProps和this.props来查明重传的props是否改变，以及如果改变了要执行啥，
    //比如根据新的props调用this.setState出发当前组件的重新render
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps", nextProps)
    console.log("nextState", nextState)
    return true
    //唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，
    //（暂时这么理解，其实setState以后有些情况并不会重新渲染，比如数组引用不变）在这里return false可以阻止组件的更新
    //因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断
    //对于react初学者，可能涉及这个生命周期的机会比较少，但是如果你的项目开始注重性能优化，随着你对react的喜爱和深入，你就会用到这个生命周期
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate')
    //shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate,这里同样可以拿到nextProps和nextState
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevProps', prevProps)
    console.log('prevState', prevState)
    //组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，
    //这里可以拿到prevProps和prevState，即更新前的props和state。
  }


  handleClick = () => { // 虽然调用了setState ，但state并无变化
    // const preSomeThings = this.state.someThings
    this.setState({
      someThings: this.state.someThings + 1
    })
  }

  render() {
    //render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，
    //在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染
    //react16中 render函数允许返回一个数组，单个字符串等，不在只限制为一个顶级DOM节点，可以减少很多不必要的div

    //根据组件的props和state（无两者的重传递和重赋值，论值是否有变化，都可以引起组件重新render）
    //return 一个React元素（描述组件，即UI），不负责组件实际渲染工作，之后由React自身根据此元素去渲染出页面DOM。
    //render是纯函数（Pure function：函数的返回结果只依赖于它的参数；函数执行过程里面没有副作用）
    //不能在里面执行this.setState，会有改变组件状态的副作用。
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>{this.state.someThings}</button>
      </React.Fragment>
    );
  }

  componentWillUnmount() {
    //componentWillUnmount也是会经常用到的一个生命周期，初学者可能用到的比较少，但是用好这个确实很重要
    //1.clear你在组建中所有的setTimeout,setInterval
    //2.移除所有组建中的监听 removeEventListener

    //也许你会经常遇到这个warning:
    //Can only update a mounted or mounting component. This usually means you called setState() on an       
    //unmounted component. This is a no-op. Please check the code for the undefined component.
    //是因为你在组建中的ajax请求返回中setState,而你组件销毁的时候，请求还未完成，因此会报warning


    //解决办法为:
    // componentDidMount() {
    //   this.isMount === true
    //   axios.post().then((res) => {
    //    this.isMount && this.setState({   // 增加条件ismount为true时
    //     aaa:res
    //   })
    //   })
    // }
    // componentWillUnmount() {
    //     this.isMount === false
    // }

  }
}


export default App;
