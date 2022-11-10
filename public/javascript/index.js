const charactersAPI = new APIHandler('http://localhost:8000');
const charactersContainer = document.querySelector('.characters-container')

async function fetchCharacters() {
  const { data } = await charactersAPI.getFullList()
  console.log(data)
  charactersContainer.innerHTML = ''
  data.forEach(character => {
    charactersContainer.innerHTML += `<div class="character-info">
    <div class="id">Id:<span>${character.id}</span></div>
    <div class="name">Name:<span>${character.name}</span></div>
    <div class="occupation">Occupation<span>${character.occupation}</span></div>
    <div class="cartoon">Is a Cartoon?<span>${character.cartoon}</span></div>
    <div class="weapon">Weapon<span>${character.weapon}</span></div>
    </div>`
  })
}

window.addEventListener('load', () => {
  document.getElementById('fetch-all').addEventListener('click', async function (event) {
  await fetchCharacters()
  });

  document.getElementById('fetch-one').addEventListener('click', async function (event) {
    const characterId = document.querySelector('input[name="character-id"]').value
    const { data } = await charactersAPI.getOneRegister(characterId)
    charactersContainer.innerHTML = `<div class="character-info">
    <div class="id">Id:<span>${data.id}</span></div>
    <div class="name">Name:<span>${data.name}</span></div>
    <div class="occupation">Occupation<span>${data.occupation}</span></div>
    <div class="cartoon">Is a Cartoon?<span>${data.cartoon}</span></div>
    <div class="weapon">Weapon<span>${data.weapon}</span></div>
    </div>`
  });

  document.getElementById('delete-one').addEventListener('click', async function (event) {
    event.preventDefault()
    try {
      const characterId = document.querySelector('input[name="character-id-delete"]')
      await charactersAPI.deleteOneRegister(characterId.value)
      await fetchCharacters()
      event.target.style.backgroundColor = 'green'
      characterId.value = ''
    } catch (error) {
      event.target.style.backgroundColor = 'red'
      console.log(error)
    }
  });

  document.getElementById('edit-character-form').addEventListener('submit', async function (event) {
    event.preventDefault()
    const id = event.target.querySelector('input[name="chr-id"]').value
    const name = event.target.querySelector('input[name="name"]').value
    const occupation = event.target.querySelector('input[name="occupation"]').value
    const weapon = event.target.querySelector('input[name="weapon"]').value
    const cartoon = event.target.querySelector('input[name="cartoon"]').checked
    const character = { name, occupation, weapon, cartoon }
    try {
      await charactersAPI.updateOneRegister(id, character)
      await fetchCharacters()
      event.target.querySelector('button').style.backgroundColor = 'green'
    } catch (error) {
      event.target.querySelector('button').style.backgroundColor = 'red'
      console.log(error)
    }
  });

  document.getElementById('new-character-form').addEventListener('submit', async function (event) {
    event.preventDefault()
    const name = event.target.querySelector('input[name="name"]').value
    const occupation = event.target.querySelector('input[name="occupation"]').value
    const weapon = event.target.querySelector('input[name="weapon"]').value
    const cartoon = event.target.querySelector('input[name="cartoon"]').checked
    const character = { name, occupation, weapon, cartoon }
    try {
      await charactersAPI.createOneRegister(character)
      await fetchCharacters()
      event.target.querySelector('button').style.backgroundColor = 'green'
    } catch (error) {
      event.target.querySelector('button').style.backgroundColor = 'red'
      console.log(error)
    }
  });
});
