import React, { useState, useEffect } from 'react'

function App() {
  const [repositories, setRepositories] = useState([])

  // Posso ter vários useEffect um para cada efeito que quero rastrear
  // Nesse caso o [] indica que esse só será executado uma vez no inicio.
  useEffect(() => {
    async function getRepositories() {
      const response = await fetch(
        'https://api.github.com/users/alcfernandes/repos'
      )
      const data = await response.json()
      setRepositories(data)
    }
    getRepositories()
  }, [])

  // Esse useEffect só será executado quando o estado de repositories mudar
  useEffect(() => {
    const favoritesRepo = repositories.filter(repo => repo.favorite)

    document.title = `Você tem ${favoritesRepo.length} favoritos.`
  }, [repositories])

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })

    setRepositories(newRepositories)
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>(Favorito)</span>}
          <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
        </li>
      ))}
    </ul>
  )
}

export default App

// function handleAddRepository() {
//   setRepositories([
//     ...repositories,
//     { id: Math.random(), name: 'Novo repositório' }
//   ])
// }
