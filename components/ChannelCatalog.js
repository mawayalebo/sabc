


async function getChannelCatalogue() {
    const res = await fetch('http://localhost:3000/api/channel-catalog', {cache:"no-cache"});
    return res.json();
}



export default async function ChannelCatalog() {

    const { data }= await getChannelCatalogue();
    const catalog = data.map((x)=>{
        return(
            x.title
        )

    })

    console.log(catalog)

  return (
    <div>
        <div className='max-w-6xl mx-auto text-white'>
            <div>
                {
                    data &&
                    data.map(((catalog, index)=>{
                        return(
                            <div key={index}>
                                <h2 className='text-4xl font-bold'>{catalog.title}</h2>
                            </div>

                        )
                        

                    }))
                }
            </div>

        </div>

    </div>
  )
}

