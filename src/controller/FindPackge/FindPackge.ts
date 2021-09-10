import { rastrearEncomendas } from 'correios-brasil'

class Find {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async finYourPackge (data: Array<string>) {
    if (data === undefined || data.length < 1) {
      throw new Error('Falta De Dados!')
    }
    console.log(data)
    const result = await rastrearEncomendas(data)
    return result
  }
}
export default new Find()
