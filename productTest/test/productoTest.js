const request = require('supertest');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mongoose = require('mongoose');
const path = require('path'); 
const app = require(path.resolve('../productApi/app.js')); 
const Producto = require(path.resolve('../productApi/models/producto.js'));
chai.use(chaiHttp);
const url= 'http://localhost:3000';


describe('POST /productos',()=>{
    it('debería crear un nuevo producto', async () => {
    chai.request(url)
    .post('/productos')
    .send({
        nombre: 'Producto Prueba',
        precio: 24,
        cantidad: 2
    })
    .end( function(err,res){
    console.log("estes es post")
    console.log(res.body)
    expect(res).to.have.status(201);
    expect(res.body.nombre).to.equal('Producto Prueba');
    expect(res.body.precio).to.equal(24);
    expect(res.body.cantidad).to.equal(2);
    });
    });
   })


describe('GET /productos', () => {
    let productoId;

    before(async () => {
        
        const producto = await Producto.create({
            nombre: 'Producto de Prueba',
            precio: 10,
            cantidad: 5
        });
        productoId = producto._id.toString();
    });

    it('debería obtener todos los productos', async () => {
    chai.request(url)
    .get('/productos')
    .end( function(err,res){
    console.log("este es get");
            console.log(res.body);

            
            expect(res).to.have.status(200);

          
            expect(res.body).to.be.an('array');

           
            expect(res.body).to.have.lengthOf.at.least(1);

          
            const producto = res.body.find(p => p._id === productoId);
            expect(producto).to.exist; 
            expect(producto).to.have.property('nombre').that.equals('Producto de Prueba');
            expect(producto).to.have.property('precio').that.equals(10);
            expect(producto).to.have.property('cantidad').that.equals(5)
    });
    });
});


describe('PUT /productos/:id', () => {
    let productoId;
    before(async () => {
        const producto = await Producto.create({
            nombre: 'Producto Original',
            precio: 20,
            cantidad: 10
        });
        productoId = producto._id.toString();
    });

    it('debería actualizar un producto por ID', async () => {
    chai.request(url)
    .put(`/productos/${productoId}`)
    .send({
     nombre: 'Producto actualizado',
     precio: 30,
     cantidad: 5
     })
    .end( function(err,res){

    console.log("estes es put")  
    console.log(res.body); 
    expect(res).to.have.status(200);
    expect(res.body).to.have.property('nombre').that.equals('Producto actualizado');
    expect(res.body).to.have.property('precio').that.equals(30);
    expect(res.body).to.have.property('cantidad').that.equals(5);

    chai.request(url)
                    .get(`/productos/${productoId}`)
                    .end((err, res) => {
                        if (err) return done(err);
                       
                        expect(res).to.have.status(200);
                    
                    });




    });
    });
});


describe('DELETE /productos/:id', () => {
    let productoId;

    before(async () => {
        const producto = await Producto.create({
            nombre: 'Carlos para eliminar',
            precio: 24,
            cantidad: 2
        });
        productoId = producto._id.toString();
    });

    it('debería eliminar un producto por ID', async () => {
        chai.request(url)
            .delete(`/productos/${productoId}`)
            .end((err, res) => {
                if (err) return done(err);

                
                expect(res).to.have.status(204);

           
                chai.request(url)
                    .get(`/productos/${productoId}`)
                    .end((err, res) => {
                        if (err) return done(err);

                       
                        expect(res).to.have.status(404);
                        
                    });
            });
    });
});






 