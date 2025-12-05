// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 1001

describe('API PetStore Swagger - Entidade Pet', () => {
    // Atributos, objetos, constantes e variáveis
    const request = supertest('https://petstore.swagger.io/v2') // Base URL
    const massaPet = require('../../vendors/json/massaPet')
    // Funções e métodos = it
    // Incluir animal
    it('POST Pet', () => {
        const pet = require('../../vendors/json/pet.json')

        return request
            .post('/pet')
            .send(pet)
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.body.id).toBe(petId)
                expect(response.body.name).toBe('Snoopy')
                expect(response.body.category.name).toBe('dog')
                expect(response.body.tags[0].name).toBe('vacinado')
            })
    }) // Final do POST

    it('GET Pet', () => {
        return request
            // .get('/pet/' + petId) // tradicional
             .get(`/pet/${petId}`)     // atual
            .then((response) => {
                console.log('Resposta Recebida:\n', response.body)
                expect(response.statusCode).toBe(200)
                expect(response.body.id).toBe(petId)
                expect(response.body.name).toBe('Snoopy')
                expect(response.body.category.name).toBe('dog')
                expect(response.body.tags[0].name).toBe('vacinado')
                expect(response.body.status).toBe('available')
            })
    }) // Final do GET

    it('PUT Pet', () => {
        const pet = require('../../vendors/json/petput.json')

        return request
            .put('/pet')
            .send(pet)
            .then((response) => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.status).toEqual('sold')
            })
    }) // Final do Put

    it('DELETE Pet', () => {
        return request
            .delete(`/pet/${petId}`)
            .then((response) => {
                expect(response.statusCode).toEqual(200)
                expect(response.body.code).toEqual(200)
                expect(response.body.type).toBe('unknown')
                expect(response.body.message).toBe(petId.toString())
            })

    }) // Final do Delete

    // POST Pet DDT - Utilizando massa de teste
    it.each(massaPet.array.map(elemento => [
        elemento.id,
        elemento.categoryid,
        elemento.categoryname,
        elemento.petname,
        elemento.tag0id,
        elemento.tag0name,
        elemento.tag1id,
        elemento.tag1name, 
        elemento.petstatus
    ]))
    ('POST Pet Data Driven: %s', (
        id,
        categoryid,
        categoryname,
        petname,
        tag0id,
        tag0name,
        tag1id,
        tag1name, 
        petstatus
    ) => {
        // Modelo do json a ser enviado
        // Valores que não forem sobrepostos seguirão como no modelo
        const pet = require('../../vendors/json/pet.json')

        // Sobreposição de valores
        pet.id = id
        pet.categoryid = categoryid
        pet.categoryname = categoryname
        pet.name = petname
        pet.tags[0].id = tag0id
        pet.tags[0].name = tag0name
        pet.tags[1].id = tag1id
        pet.tags[1].name = tag1name
        pet.status = petstatus

        // Teste em si
        return request
            .post('/pet')
            .send(pet)
            .then((response) => {
                expect(response.statusCode).toBe(200)
                expect(response.body.id).toBe(id)
                expect(response.body.name).toBe(petname)
                expect(response.body.category.name).toBe(categoryname)
                expect(response.body.tags[0].name).toBe(tags0name)
            })

    }) // Final do Post Pet DDT

})