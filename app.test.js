
/*
 * This file provides unit testing for the primary app file.
 * You can change the import to meet whatever is required.
 * NOTICE: This format uses ECMA modules.
 */
import request from 'supertest';
import app from './app.js';
import {jest} from '@jest/globals'


// BASIC
describe('Root GET', ()=>{ 
    test('/ should return anything', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect((res) => {
                expect(res).toBeDefined();
            })
            .end((err, res) => {
                if(err) throw err;
                done();
        })
    });
});
    
// PARAMS with GET
describe('Users', ()=>{
    test('should set id through param', (done) => {
        request(app)
            .get('/login/123')
            .expect(200)
            .end((err, res) => {
                if(err) throw err;
                done();
        })
    });
    // TODO: Figure out how to get this test to work.
    // test('should see their id at /hello', async (done) => {
    //     jest.setTimeout(10000);
    //     request(app)
    //         .get('/hello')
    //         .expect(200)
    //         .expect((res) => {
    //             expect(res).toBeDefined();
    //         })
    //         .end((err, res) => {
    //             if(err) throw err;
    //             done();
    //     })
    // });

});