'use client'

import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { Field, Label, Switch } from '@headlessui/react'
import React from 'react'
import axios from 'axios'

export default function Inputs() {
  const [data, setData] = useState([])

//   useEffect(() => {
//     // axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}?inicio=${anoInicio}&fim=${anoFim}`)
//     .then((response) => {
//       setData(response.data)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   }, [])

  function handleSearch() {
    const nome = document.querySelector('#nome')
    const anoInicio = document.querySelector('#anoInicio')
    const anoFim = document.querySelector('#anoFim')

    console.log(nome)
    console.log(anoInicio)
    console.log(anoFim)
  }

  return (
    <>
        <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
            >
                <div
                style={{
                    clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-1/2 -z-10 aspect-1155/678 w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                />
            </div>
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl">IBGE</h2>
            </div>

            <div className="flex justify-center mt-10">
                <label className="mt-3.5 mr-2 block text-sm/6 font-semibold text-gray-900">
                    Nome
                </label>
                <div className="mt-2.5">
                    <input
                        id="nomee"
                        name="nome"
                        type="text"
                        className="block w-auto rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        placeholder="Digite o nome"
                    />
                </div>
            </div>

            <div className="mx-auto mt-7 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                    <div>
                        <label htmlFor="last-name" className="block text-sm/4 font-semibold text-gray-900">
                        Ano Inicio
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="anoInicio"
                                name="anoInicio"
                                placeholder="Digite o ano: 1920"
                                type="text"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="last-name" className="block text-sm/4 font-semibold text-gray-900">
                        Ano Fim
                        </label>
                        <div className="mt-2.5">
                            <input
                                id="anoFim"
                                name="anoFim"
                                placeholder="Digite o ano: 2000"
                                type="text"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                </div>

                <div className="mt-10">
                    <button
                        type="submit"
                        onClick={handleSearch}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                        Buscar
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}
