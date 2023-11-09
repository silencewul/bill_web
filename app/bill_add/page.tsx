'use client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import {useRouter} from "next/navigation";
import { useEffect, useState } from 'react'

export default function AddBill() {
    const router = useRouter()
    const [value, onChange] = useState(new Date());
    const [kind,setKind] = useState(1);
    const [cate,setCate] = useState([]);
    const [selectCate,setSelectCate] = useState(1);
    const [money,setMoney] = useState(0);
    const [note,setNote] = useState('');


    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:3001/api/category');
        const data = response.data;
        setCate(data.data);
    } catch (error) {
        console.error('请求错误:', error);
    }
    };

    async function submit() {
        let data = {
            'kind':kind,
            'category_id':selectCate,
            'money':parseFloat(money.toString()),
            'note':note,
            'date':value.toLocaleDateString().replaceAll('/','-')
        }
        try {
            const response = await axios.post('http://127.0.0.1:3001/api/bill/add', JSON.stringify(data));
            if (response.data.code == 1) {
              alert('添加失败')
            } else if (response.data.code == 0) {
              router.push('/')
            }
            // 处理响应逻辑...
          } catch (error) {
            // 处理错误逻辑...
          }
    }

  return <div className="lg:flex sm:items-center sm:justify-center">
    <div className="mt-5 flex lg:ml-4 lg:mt-0">
    <span className=" sm:block mx-auto">
      <button type="button" onClick={() => setKind(1) }
              className={(kind == 1 ? "bg-red-300":"bg-white")+" inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        收入
      </button>
    </span>

      <span className="mx-auto sm:block">
      <button type="button" onClick={() => setKind(2) }
              className={(kind == 2 ? "bg-green-300":"bg-white")+" inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

        支出
      </button>
    </span>
    </div>

    <p className="mt-5 pt-5 px-2 tracking-tight text-gray-900">收支类型</p>

    <div className="justify-left grid grid-cols-4">
      <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          <p className="text-center">购物</p>
      </div>

        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200 bg-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
            </svg>
            <p className="text-center">餐饮</p>
        </div>
        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
            <p className="text-center">送礼</p>
        </div>
        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <p className="text-center">话费</p>

        </div>
        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
            <p className="text-center">股票</p>

        </div>
        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <p className="text-center">房租</p>

        </div>
        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
                <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <p className="text-center">电影</p>

        </div>
        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-center">工资</p>

        </div>

    </div>

      <div className="mt-5 pt-5 px-2 justify-center">
          <label htmlFor="price" className="pt-5 px-2 tracking-tight text-gray-900">金额</label>
          <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">￥</span>
              </div>
              <input type="number" name="money" id="money" required onChange={e => setMoney(e.target.value)} 
                     className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     placeholder="0.00" />
          </div>
      </div>
      <div className="mt-3 pt-5 px-2 justify-center">
          <label htmlFor="price" className="pt-5 px-2 tracking-tight text-gray-900">备注</label>
          <div className="relative mt-2 rounded-md shadow-sm">
              <input type="text" name="note" id="note" onChange={e => setNote(e.target.value)} 
                     className="block w-full rounded-md border-0 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                     placeholder="" />
          </div>
      </div>
{/*      <Calendar
          onDayPress={day => {
              setSelected(day.dateString);
          }}
          markedDates={{
              [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
          }}
      />*/}
      <div className="mt-2 mb-40 pt-5 px-2 flex justify-center">
          <Calendar onChange={onChange} value={value} />
      </div>

    <a href="#" onClick={submit}
           className="fixed inset-x-0 bottom-1 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">添加</a>
  </div>


}