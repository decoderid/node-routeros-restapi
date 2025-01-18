import RouterOSRestApi from './node-routeros-restapi'

RouterOSRestApi.setup({
    ip: '172.16.0.6',
    port: 80,
    ssl: false,
    username: 'rest-api-only',
    password: 'rest-api-only'
})

const system = {
    identity: await RouterOSRestApi.getSystemIdentity(),
    resource: await RouterOSRestApi.getSystemResource()
}

const interfaces = {
    ethernet: await RouterOSRestApi.getInterfaceEthernet(),
    vlan: await RouterOSRestApi.getInterfaceVlan()
}

const ppp = {
    active: await RouterOSRestApi.getPPPActive()
}

console.log({
    system,
    ppp,
    interface: interfaces
})
