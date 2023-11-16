'use client';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";
import {useRouter} from "next/navigation";
import { useEffect, useState, } from 'react'

export default function AddBill() {
    const router = useRouter()
    const [value, onChange] = useState(new Date());
    const [kind,setKind] = useState(1);
    const [cate,setCate] = useState([]);
    const [selectCate,setSelectCate] = useState(1);
    const [money,setMoney] = useState(0);
    const [note,setNote] = useState('');

    useEffect(() => {
        fetchData(kind);
      }, [kind]);

    const fetchData = async (kind) => {
    try {
        const response = await axios.get('http://127.0.0.1:3001/api/category?k='+kind);
        const data = response.data;
        setCate(data.data);
    } catch (error) {
        console.error('请求错误:', error);
    }
    };

    function setKindClick(e,k) {
      e.preventDefault();
        setKind( k )
        console.log("k-------"+k)
        console.log("kind-------"+kind)
        if (k != kind) {
            fetchData(k)
        }
    }

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
      <button type="button" onClick= {(e) => setKindClick(e,1)} 
              className={(kind == 1 ? "bg-red-300":"bg-white")+" inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        收入
      </button>
    </span>

      <span className="mx-auto sm:block">
      <button type="button" onClick={(e) => setKindClick(e,2) }
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
    {cate.map((c)=>(
        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
          </svg>
          <p className="text-center">{c.title}</p>
      </div>
    ))}
      

        <div className="h-16 w-16  items-center  ml-3 mt-4 rounded-md border border-gray-200 bg-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mt-1 mx-auto flex h-8 w-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.87c1.355 0 2.697.055 4.024.165C17.155 8.51 18 9.473 18 10.608v2.513m-3-4.87v-1.5m-6 1.5v-1.5m12 9.75l-1.5.75a3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0 3.354 3.354 0 00-3 0 3.354 3.354 0 01-3 0L3 16.5m15-3.38a48.474 48.474 0 00-6-.37c-2.032 0-4.034.125-6 .37m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.17c0 .62-.504 1.124-1.125 1.124H4.125A1.125 1.125 0 013 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 016 13.12M12.265 3.11a.375.375 0 11-.53 0L12 2.845l.265.265zm-3 0a.375.375 0 11-.53 0L9 2.845l.265.265zm6 0a.375.375 0 11-.53 0L15 2.845l.265.265z" />
            </svg>
            <p className="text-center">餐饮</p>
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