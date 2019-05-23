const say = str => {
  console.log('say ...')
  console.log(str)
}

const speak = str => {
  console.log('speak ...')
  console.log(str)
}

const testObj = obj => {
  console.log('testObj ...')
  return obj.a
}

// 存在副作用 + 记录到 package.json.sideEffects 就可以在打包时也打包进去
testObj({ a: 1 })

export { say, speak, testObj }
