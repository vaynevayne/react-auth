[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/vaynevayne/react-auth)


[Open in codesandbox](https://codesandbox.io/p/github/vaynevayne/react-auth/)


1. 在 layout render 里处理请求,将导致其他状态改变引起 render, 而还未请求完毕时, 又重新发起一次, 在 loader 里没有多次请求, 但是也需要考虑登录时使用 replace 刷新页面 重新请求

```jsx
 if (!gameListIsFetched) {
    fetchGameList()
  }

    useEffect(() => {
      fetchGameList()
  }, []) // mounted 时直接请求一次, 缺点 user 改变不会重新请求,登录使用 replace 来修复

  
```

所以直接使用 useSwr, 直接在 app.tsx[loader 不是 hook, 不能在里面使用 useSwr] 里,mounted 时 获取所有数据之后再渲染路由,配合登录后使用 replace刷新页面(或者不刷新,使用 mutate)

使用 provider 可以挂起请求? 整个应用的 before hook 
https://gist.github.com/samselikoff/ac8076c6c224786da23c9297567585cf

https://doichevkostia.dev/blog/authentication-store-with-zustand/
