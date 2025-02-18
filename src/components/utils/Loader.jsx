import React from 'react'

const Loader = ({styles}) => {
  return (
    <div className={styles}>
      <div className="w-full relative">
        <div
          className="bg-secondary opacity-80 mix-blend-multiply animate-blob absolute filter blur-sm inset-0 m-auto -left-36 h-72 w-72 rounded-full"
        ></div>
        <div
          className="bg-textoLogo opacity-80 mix-blend-multiply animation-delay-4000 animate-blob absolute filter blur-sm inset-0 m-auto -right-36 h-72 w-72 rounded-full"
        ></div>
        <div
          className="bg-principal opacity-80 mix-blend-multiply animation-delay-2000 animate-blob absolute filter blur-sm inset-0 m-auto -bottom-8 h-72 w-72 rounded-full"
        ></div>
      </div>
    </div>
  )
}

export default Loader
