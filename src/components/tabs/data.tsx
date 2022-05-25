import { useSelector } from 'react-redux'

import { AppState } from 'store'

const DataTab = () => {
    const { rounds } = useSelector((state: AppState) => state)

    return (
        <>
            <div>
            {Object.values(rounds).map(round => (
            <div>
                {round.epoch}:{round.address}
            </div>
          ))}
            </div>
        </>
    )
}

export default DataTab
