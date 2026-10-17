import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../src/index.js';

test('rejects partner domain', async () => {
 const res=await worker.fetch(new Request('https://ecbtax.com/'),{});
 assert.equal(res.status,403);
});
test('does not expose unapproved legal text', async () => {
 const res=await worker.fetch(new Request('https://firmsfinder.eu/legal/privacy'),{});
 assert.equal(res.status,503);
});
test('requires explicit upstream configuration', async () => {
 const res=await worker.fetch(new Request('https://firmsfinder.eu/'),{});
 assert.equal(res.status,503);
});
test('rejects recursive upstream', async () => {
 const res=await worker.fetch(new Request('https://firmsfinder.eu/'),{UPSTREAM_ORIGIN:'https://firmsfinder.eu'});
 assert.equal(res.status,500);
});
