'use client';
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Cookies from 'js-cookie';

export default function Login() {
  const router = useRouter()
  const [phone,setPhone] = useState('');
  const [pwd,setPwd] = useState('');

  async function handleSendClick(e) {
    e.preventDefault();
    let data = {
      'input':phone,
      'password':pwd,
    }
    try {
      const response = await axios.post('http://127.0.0.1:3001/api/login', JSON.stringify(data));
      if (response.data.code == 1) {
        alert('登录失败')
      } else if (response.data.code == 0) {
        //用户token放入缓存中
        Cookies.set('token', response.data.data.token);
        //跳转主页
        router.push('/')
      }
      // 处理响应逻辑...
    } catch (error) {
      // 处理错误逻辑...
    }
  }

  return <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
           alt="Your Company" />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          登录
        </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSendClick} >
        <div>
          <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">手机号/邮箱</label>
          <div className="mt-2">
            <input  value={phone} onChange={e => setPhone(e.target.value) } id="phone" name="phone"  required
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">密 码</label>
          </div>
          <div className="mt-2">
            <input value={pwd} onChange={e => setPwd(e.target.value)} id="password" name="password" type="password" autoComplete="current-password" required
                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <button type='submit'
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            登 录
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        还没有账号?
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">点击注册</a>
      </p>
    </div>
  </div>
}