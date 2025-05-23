'use client'

import { useState } from 'react'
import React from 'react'
import axios from 'axios'
import Chart from './Chart'
import LocalizationTable from './LocalizationTable'
import BarChart from './BarChart'

export default function Inputs() {
    const [chartData, setChartData] = useState(null)
    const [barChartData, setBarChartData] = useState(null)
    const [nome, setNome] = useState("")
    const [anoInicio, setAnoInicio] = useState("")
    const [anoFim, setAnoFim] = useState("")
    const [localidade, setLocalidade] = useState("")
    const [activeSection, setActiveSection] = useState('evolucao')
    const [showTable, setShowTable] = useState(false)
    const [localidadeTable, setLocalidadeTable] = useState(null)
    const [primeiroNome, setPrimeiroNome] = useState("")
    const [segundoNome, setSegundoNome] = useState("")


    const navigation = [
        { name: 'Evolução do ranking de um nome', section: 'evolucao' },
        { name: 'Evolução do ranking de nomes em uma localidade', section: 'localidade' },
        { name: 'Comparação de dois nomes ao longo do tempo (nacional)', section: 'comparacao' },
      ]

      function filterYear(data, mode, anoInicio = null, anoFim = null) {
        return data.filter((item) => {
            const periodo = item.periodo;

            const regex = /\[?(\d{4}),(\d{4})\]?/;
            const match = periodo.match(regex);

            if (!match) return false

            const periodoInicio = parseInt(match[1], 10);
            const periodoFim = parseInt(match[2], 10);

            if (mode == "nome") {
        
              return (anoFim > periodoInicio && anoInicio < periodoFim);
            }

            if (mode == "comparacao") {
                return [periodoInicio, periodoFim];
            }
        
            return false;
          })
    }

    async function handleSearch() {
        const ibgeData = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome}?decada=${anoInicio}`)
        const formatData = filterYear(ibgeData.data[0].res, "nome", anoInicio, anoFim)

        const grapy = {
            labels: formatData.map(
                data => {
                    const label = data.periodo.replace(/[\[\]]/g, '');
                    return label
                }),
            datasets: [
            {
                label: 'Frequência',
                data: formatData.map(data => data.frequencia),
                backgroundColor: "#9089fc"
            }
            ]
        }
        
        setChartData(grapy)
        setNome("")
        setAnoInicio("")
        setAnoFim("")
    }

    async function handleSearchLocalidade() {
        const ibgeData = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?localidade=${localidade}`)
        const moreFrequency = ibgeData.data[0].res.sort((a, b) => b.frequencia - a.frequencia).slice(0, 3);
        const tableData = moreFrequency.map(item => ({
            nome: item.nome,
            frequencia: item.frequencia
        }))

        setLocalidadeTable(tableData)
        setLocalidade("")
        setShowTable(true)
    }

    async function handleSearchComparacao() {
        const firstName = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${primeiroNome}`)
        const secondName = await axios.get(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${segundoNome}`)

        const firstNameFormat = filterYear(firstName.data[0].res, "comparacao")
        const secondNameFormat = filterYear(secondName.data[0].res, "comparacao")

        const grapy = {
            labels: firstNameFormat.map(
                data => {
                    const label = data.periodo.replace(/[\[\]]/g, '');
                    return label
                }),
            datasets: [
            {
                label: primeiroNome,
                data: firstNameFormat.map(data => data.frequencia),
                backgroundColor: "#9089fc"
            },
            {
                label: segundoNome,
                data: secondNameFormat.map(data => data.frequencia),
                backgroundColor: "#A889FC"
            }
            ]
        }

        setBarChartData(grapy)
        setPrimeiroNome("")
        setSegundoNome("")
    }

    const handleSectionChange = (section) => {
        setActiveSection(section)
        setShowTable(false)
        setChartData(null)
        setBarChartData(null)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

  return (
    <>
        <div className="bg-white">
            <header className="absolute inset-x-0 top-0 z-50">
                <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                    <div className="flex lg:flex-1"></div>

                    <div className="hidden lg:flex lg:gap-x-12 ">
                        {navigation.map((item) => (
                        <button 
                            key={item.name} 
                            onClick={() => handleSectionChange(item.section)}
                            className={`text-sm/6 font-semibold p-2 rounded delay-100 transition-all ${
                                activeSection === item.section 
                                    ? 'bg-[#9089fc] text-white' 
                                    : 'bg-white text-gray-900 hover:bg-[#9089fc]/10'
                            }`}
                        >
                            {item.name}
                        </button>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
                </nav>
            </header>
        </div>

        {/* Section Evolucao */}
        
        <div className={`isolate bg-white px-6 py-24 sm:py-32 lg:px-8 ${activeSection === 'evolucao' ? 'block' : 'hidden'}`}>
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
                        id="nome"
                        name="nome"
                            value={nome} 
                            onChange={(e) => setNome(e.target.value)}
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
                                value={anoInicio} 
                                onChange={(e) => setAnoInicio(e.target.value)}
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
                                value={anoFim} 
                                onChange={(e) => setAnoFim(e.target.value)}
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

                <Chart data={chartData} />

            </div>
        </div>

        {/* Section Localidade */}

        <div className={`isolate bg-white px-6 py-24 sm:py-32 lg:px-8 ${activeSection === 'localidade' ? 'block' : 'hidden'}`}>
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

            <div className="mx-auto mt-7 max-w-xl sm:mt-20">
                <div className="grid place-items-center">
                    <div className="w-full">
                        <label htmlFor="localidade" className="block text-center text-sm/4 font-semibold text-gray-900 text-[1.5rem] mb-10">
                        Localidade
                        </label>
                        <div className="mt-2.5">
                            <input 
                                id="localidade"
                                name="localidade"
                                value={localidade} 
                                onChange={(e) => setLocalidade(e.target.value)}
                                placeholder="Digite o código do município exemplo: 355030"
                                type="text"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <button 
                    type="submit"
                        onClick={handleSearchLocalidade}
                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Buscar
                    </button>
                </div>

                <div className={`${showTable ? 'block' : 'hidden'}`}>
                    <LocalizationTable data={localidadeTable}/>
                </div>

            </div>
        </div>

        {/* Section Comparacao */}
        
        <div className={`isolate bg-white px-6 py-24 sm:py-32 lg:px-8 ${activeSection === 'comparacao' ? 'block' : 'hidden'}`}>
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

            <div className="mx-auto mt-7 max-w-xl sm:mt-20">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">

                    <div>
                        <label htmlFor="primeiroNome" className="block text-sm/4 font-semibold text-gray-900">
                        Nome
                        </label>
                        <div className="mt-2.5">
                            <input 
                                id="primeiroNome"
                                name="primeiroNome"
                                value={primeiroNome} 
                                onChange={(e) => setPrimeiroNome(e.target.value)}
                                placeholder="Digite o nome: Maria"
                                type="text"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="segundoNome" className="block text-sm/4 font-semibold text-gray-900">
                        Nome
                        </label>
                        <div className="mt-2.5">
                            <input 
                                id="segundoNome"
                                name="segundoNome"
                                value={segundoNome} 
                                onChange={(e) => setSegundoNome(e.target.value)}
                                placeholder="Digite o nome: Henrique"
                                type="text"
                                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                            />
                        </div>
                    </div>

                </div>

                <div className="mt-10">
                        <button 
                        type="submit"
                            onClick={handleSearchComparacao}
                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Buscar
                        </button>
                    </div>

                <BarChart data={barChartData}/>

            </div>
        </div>
    </>
  )
}
