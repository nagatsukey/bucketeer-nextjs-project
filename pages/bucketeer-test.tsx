import { useRef, useEffect } from 'react'
import { Bucketeer } from '@bucketeer/sdk'

const HOST = 'https://api-media.bucketeer.jp';
const TOKEN = '';　// ここには書きません

export default function Home() {
  const bucketeer = useRef<Bucketeer | null>(null);
  useEffect(() => {
    if(!bucketeer.current) {
      // node側で実行すると「window is not defined」のエラーがでるのでクライアントだけで実行するようにしている
      if(typeof window !== "undefined") {
        import('@bucketeer/sdk').then((sdk) => {
          const { initialize } = sdk;
          bucketeer.current = initialize({
            host: HOST,
            token: TOKEN,
            tag: "web",
            user: {
              id: "00000000-0000-0000-0000-ca633444b941",
              data: {
                foo: 'bar',
              },
            },
            fetch: fetch,
            pollingIntervalForGetEvaluations:2 * 60 * 1000,
            pollingIntervalForRegisterEvents:2 * 60 * 1000,
          });
          console.table(bucketeer.current.getBuildInfo());
          // ここでは「defaultValue」が出力される
          console.log(bucketeer.current.getStringVariation('nmb-lp-title', 'defaultValue'));
        });
      }
    }
  },[]);
  return (
    <button onClick={()=> { if(bucketeer.current){ console.log(bucketeer.current.getStringVariation('nmb-lp-title', 'defaultValue')) } }}>bucketeerの状況を出力</button>
  )
}
