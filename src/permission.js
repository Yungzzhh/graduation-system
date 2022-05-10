
  
// let str = "public\\titleImg\\20220411\\1649685478412.jpg"
// console.log(str.split("\\").reduce((all,cur,curIndex)=>
//   all+'/'+cur
// ,""));
// let list = ['/public/titleImg/20220411/1649686049209.jpg', '/public/titleImg/20220411/1649686049213.jpg', '/public/titleImg/20220411/1649686049214.jpg']

// // let imgSqlUrl = ""
// // for(let i=0;i<list.length;i++) {
// //   imgSqlUrl = imgSqlUrl+list[i]+'|'
// // }
// // console.log(imgSqlUrl);
// let newList = list.map(item => item + '222')
// console.log(newList);

// let str = "http://localhost:3000/titleImg/20220412/1649699656350.jpg|http://localhost:3000/titleImg/20220412/1649699656353.jpg|"
// console.log(str.split("|"));
// console.log(new Date());
// function format(dateInput, format) {
//   let Year = dateInput.getFullYear()
//   let Month = dateInput.getMonth() +1
//   let day = dateInput.getDate()
//   let hour = dateInput.getHours()
//   let min = dateInput.getMinutes()
//   let second = dateInput.getSeconds();
//   format = format.replace(/yyyy/,Year)
//   format = format.replace(/MM/,Month)
//   format = format.replace(/dd/,day)
//   format = format.replace(/HH/,hour)
//   format = format.replace(/mm/,min)
//   format = format.replace(/ss/,second)
//   return format
// }
// console.log(format(new Date(),'yyyy-MM-dd-HH-mm-ss'));

// async function test1() {
//   console.log('start');
//   // await async2()
//   // console.log('end');
//   new Promise((r,j)=> {
//     console.log(1);
//     r()
//   }).then(res=>{
//     console.log('end');
//   })
// }

// let map = new Map()
// let arr = [1,2,3,3,5,2,9,8,6,5,3]
// for(let i=0;i<arr.length;i++) {
//   if(!map.has(arr[i])) {
//     map.set(arr[i],1)
//   } else {
//     map.set(arr[i],map.get(arr[i])+1)
//   }
// }
// let res = 0
// for(let i=0;i<map.size;i++) {
//   res = Math.max(res, map.get(i))
// }
// console.log();
// for(let i=0;i<)

// [{allowed: "1",
// author: "阿萨达萨德",
// contact: "奥术大师大"}, {allowed: Null,
// author: "阿萨达萨德",
// contact: "奥术大师大"}]

    // getMessage() {
    //   // //向服务端发送消息
    //   // this.$io.emit('sendMsg', { time: new Date() })
    //   // //接收服务端相对应的webdata数据
    //   // this.$io.on('setId', data => {
    //   //   this.massage = data.id
    //   //   console.log(this.massage);
    //   // })
    // },
    // init() {
    //   this.$io.on('notice',data => {
    //     console.log(data);
    //     // if(sessionStorage.getItem('email') === data.teacherEmail) {
    //     //   //这是老师，还需要判断老师是否在登录状态
    //     //   // this.checkStatus(data.email).then(res=> {
    //     //   //   if(res === 'loginIN') {
    //     //   //     this.$io.on('logined',)
    //     //   //   }
    //     //   // });
    //     //   this.$message({
    //     //     message: '',
    //     //     type: 'success'
    //     //   });
    //     // } else {
    //     //   console.log(data);
    //     //   console.log('我是学生，不应该收到这个通讯');
    //     // }
    //   })
    // },

// const user = [{
//     email:'1'
// },{
//     email:'2'
// }]
// let res = user.find(item=> item.email === '1')
// console.log(res);
let temp = [
    { id: 'piI9jO-agIbKTgkdAAAD', email: '567890@tea.com' },
    { id: 'VfcI638FcAO1F_W2AAAF', email: '567890@tea.com' }
  ]

// function uniq(arr) {
//     for()
// }