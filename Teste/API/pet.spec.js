// Bibliotecas e frameworks
const supertest = require('supertest')

const petId = 1001

describe('API PetStore Swagger - Entidade Pet', () => {
    // Atributos, objetos, constantes e variáveis
    const request = supertest('https://petstore.swagger.io/v2') // Base URL

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
            .get(`/pet/${petId}`)    // atual
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

})