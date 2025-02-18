import React from 'react'

const NotFound = (props) => {
  return (
    <div className="flex justify-center items-center min-h-screen text-textDark dark:text-textLight">
      <div className='backdrop-blur-lg dark:bg-backgroundDark/30 bg-backgroundLight/10 min-w-fit px-10 py-5 rounded-lg border border-[#000] dark:border-[#fcfcfc]'>
        <h1>Error!</h1>
        <h2>Pagina no Encontrada!</h2>
      </div>
    </div>
  )
}

export default NotFound
