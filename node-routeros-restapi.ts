import type { ConfigType } from './types.ts'

export default class RouterOSRestApi {

    static config: ConfigType

    static setup(config: ConfigType) {
        this.config = config
    }

    private static async httpClient(path: string, options?: RequestInit): Promise<unknown> {
        try {
            const cleanPath = path.startsWith("/") ? path.slice(1) : path;
            const response = await fetch(`${this.config.ssl ? 'https' : 'http'}://${this.config.ip}:${this.config.port}/rest/${cleanPath}`, {
                ...options,
                headers: {
                    Authorization: `Basic ${Buffer.from(this.config.username + ':' + this.config.password, 'utf-8').toString('base64')}`
                }
            })

            const json = await response.json()

            return json
        } catch (err) {
            return Promise.reject(err)
        }
    }

    /**
     * System -> Identity
     * 
     */
    static async getSystemIdentity() {
        const response = await this.httpClient('/system/identity')
        return response
    }

    /**
     * System -> Resource
     * 
     */    
    static async getSystemResource() {
        const response = await this.httpClient('/system/resource')
        return response
    }

    /**
     * Interface -> Ethernet
     * 
     */    
    static async getInterfaceEthernet() {
        const response = await this.httpClient('/interface/ethernet')
        return response
    }

    /**
     * Interface -> Vlan
     * 
     */    
    static async getInterfaceVlan() {
        const response = await this.httpClient('/interface/vlan')
        return response
    }    

    /**
     * PPP -> Active List
     * 
     */ 
    static async getPPPActive() {
        const response = await this.httpClient('/ppp/active')
        return response
    }
}
