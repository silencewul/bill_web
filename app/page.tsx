'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from 'react'

export default function Index() {
  const [billList,setBillList] = useState([])
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3001/api/bills');
      const data = response.data;
      setBillList(data.data);
    } catch (error) {
      console.error('请求错误:', error);
    }
  };

  return <div className="lg:flex sm:items-center sm:justify-center">
    <h2 className="top-0.5 justify-centerr items-center mx-auto text-center pt-2"></h2>
    <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
      <div
          className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
        <div className="mx-auto max-w-xs px-8">
          <p className="text-base font-semibold text-gray-600">今日收支</p>
          <p className="mt-6 flex items-baseline justify-center gap-x-2">
            <span className="text-5xl font-bold tracking-tight text-red-500">+95</span>
            <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">元</span>
          </p>
          <p className="mt-4 text-xs leading-5 text-gray-600">
            <span>当前月收入</span><span className="text-red-500">+500.00元</span>
          </p>
        </div>
      </div>
    </div>
    <p className="pt-2 px-2 tracking-tight text-gray-900">收支明细</p>
    <div className="mt-2 px-8 mb-20">
      <div className="flow-root">
        <ul role="list" className="-my-3 divide-y divide-gray-200">
          {billList.map((bill) => (
            <li className="flex py-6">
            <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <svg className={(bill.kind==1?"text-red-300":"text-green-200")+" h-16 w-24 flex-shrink-0 group-hover:text-gray-500"} fill="none"
                   viewBox="0 0 24 24"  stroke="currentColor" aria-hidden="true">
                <path
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
              </svg>
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <p>早餐</p>
                  </h3>
                  
                  <p className="ml-4 text-green-300"><span>{bill.kind == 1?"+":"-"}</span>{bill.money}元</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{bill.date}</p>
              </div>
              <div className="flex flex-1 items-end  text-sm">
                <p className="pl-0 text-sm text-gray-500">{bill.note}</p>
                <div className="flex ml-auto justify-end">
                  <button type="button"
                          className="font-medium text-sm text-indigo-600 hover:text-indigo-500">删除
                  </button>
                </div>
              </div>
            </div>
          </li>)
            )}
          
          <li className="flex py-6">
            <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-16 w-24 flex-shrink-0 text-red-300 group-hover:text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7.5l3 4.5m0 0l3-4.5M12 12v5.25M15 12H9m6 3H9m12-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <p>股票</p>
                  </h3>
                  <p className="ml-4 text-red-500">+100.00元</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">2023-10-28</p>
              </div>
              <div className="flex flex-1 items-end  text-sm">
                <div className="flex ml-auto justify-end">
                  <button type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500">删除
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div className="fixed inset-x-0 bottom-1 block w-full rounded-md">
      <Link href='/bill_add'>
      <svg type="button" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-yellow-200 mx-auto text-center hover:text-yellow-300">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      </Link>
    </div>
    {/*<a href="#"
           className="fixed inset-x-0 bottom-1 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">添加账单</a>*/}
  </div>


}