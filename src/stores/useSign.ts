import { defineStore } from 'pinia'
import { ref } from 'vue'

const fakeData = {
  docList: [
    {
      docNo:'0989',
      sort: 1,
      formList: [
        {
          formNo: '0989_01',
          sort: 2,
          signList: [
            {
              sort:1,
              id: '08756612',
              title: '對保人',
            }
          ]
        }
      ]
    }
  ],
  docForms: [
    {
      data: 'erhrthohjnioujwgkjl12fwefg',
      docNo: '0989'
    },
    {
      data: 'erhrwegergrthohjnioujwgkjl12fwefg',
      docNo: '0789'
    },
  ]
}

type Sign = {
  sort: number,
  id: string,
  title: string,
}

type Form = {
  formNo: string,
  sort: number,
  signList: Sign[]
}
type DocItem = {
  docNo: string,
  sort: number,
  formList: Form[]
}
type DocFile = {
  data: string,
  docNo: string,
}
type OriginData = Record<string, DocItem>

type SignDentenary<T = unknown> = {
  formIndex: number,
  sort: number,
  signId: string,
  docNo: string,
} & T
type FakeResult = {
  docList: DocItem[],
  docForms: DocFile[]
}

export const useSign = defineStore('sign', () => {
  const originData = ref<OriginData>({
    '1': { docNo:'',sort: 0,formList: [] }
  })
  // const originSearchDictionary = computed(() => {
  //   const data = new Map()
  //   return Object.values(originData.value).forEach((val: DocItem) => data.set(val.docNo, val))
  // })
  const signSearchDictionary = ref<Map<string,SignDentenary<{index: number}>>>()

  const fakeApi = (): Promise<FakeResult> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(fakeData)
      }, 1000)
    })
  }
  const packingOriginData = (result: FakeResult) => {
    const { docList } = result
    const data = docList.reduce((pre, cur) => {
      pre[cur.docNo] = cur
      return pre;
    }, {} as OriginData)
    originData.value = data
    signSearchDictionary.value = Object.values(originData.value)
      .flatMap(
        (item) => item.formList.flatMap((form, formIndex) => {
          return form.signList.flatMap((sign, index) => {
            return {
              ...sign,
              index,
              formIndex,
            }
          })
        })
      ).reduce((pre, cur) => {
        pre.set(cur.id, cur)
        return pre
      }, new Map)
      console.log(signSearchDictionary.value)
  }
  const getSign = async() => {
    return new Promise((resolve) => {
      fakeApi().then((res:FakeResult) => {
        packingOriginData(res)
        resolve(res)
      })
    })
  }
  return {
    originData,
    fakeApi,
    getSign
  }
})