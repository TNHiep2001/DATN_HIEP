import { Box } from '@mui/system'
import React, { useMemo, useState } from 'react'
import { LoadingProvider, TableProvider } from 'src/components'
import { VictoryLabel, VictoryPie, VictoryTheme } from 'victory'

function Statistic(props) {
  const [dataEduSchedule, setDataEduSchedule] = useState([
    { x: 'Complete', y: 70 },
    { x: 'Incomplete', y: 30 },
  ])
  const [dataEventSchedule, setDataEventSchedule] = useState([
    { x: 'Complete', y: 55 },
    { x: 'Incomplete', y: 45 },
  ])

  const renderResult = (value) => {
    return (
      <Box
        sx={{
          width: '100px',
          height: '40px',
          backgroundColor: value === 'Complete' ? '#5F8D4E' : '#E25E3E',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '6px',
        }}
      >
        {value}
      </Box>
    )
  }

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        minWidth: 50,
        width: 50,
      },
      {
        Header: 'Type Schedule',
        accessor: 'type',
        minWidth: 200,
      },
      {
        Header: 'Lecture Content',
        accessor: 'lecture_content',
        minWidth: 400,
      },
      {
        Header: 'Result',
        accessor: (propsColumn) => {
          const { status } = propsColumn
          return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>{renderResult(status)}</Box>
          )
        },
      },
    ],
    [],
  )

  const fullDataSchedule = {
    status: 'success',
    data: [
      {
        id: 1,
        type: 'Teaching Schedule',
        lecture_content: 'Giới thiệu về lập trình hướng đối tượng',
        status: 'Complete',
      },
      {
        id: 2,
        type: 'Teaching Schedule',
        lecture_content: 'Giới thiệu về cấu trúc dữ liệu và giải thuật',
        status: 'Incomplete',
      },
      {
        id: 3,
        type: 'Event Schedule',
        lecture_content: 'Hội thảo nghiên cứu khoa học',
        status: 'Incomplete',
      },
    ],
    paging: {
      total: 31,
      total_page: 4,
      current_page: 1,
      limit: 10,
      next_page: 2,
    },
  }

  const [paging, setPaging] = useState({
    current_page: 1,
    limit: 10,
    total_page: 4,
  })

  const renderChartEduSchedule = () => {
    return (
      <div>
        <svg width={400} height={500}>
          {/* VictoryPie component */}
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={dataEduSchedule}
            innerRadius={50}
            labelRadius={60}
            colorScale={['#5F8D4E', '#E25E3E']}
            style={{ labels: { fill: '#fff', fontSize: 15 } }}
            theme={VictoryTheme.material}
          />

          {/* VictoryLabel component for center text */}
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={200}
            y={380}
            text="Edu Schedule Statistic"
            style={{ fontSize: 24 }}
          />

          {/* VictoryLabel components for data labels */}
          {dataEduSchedule.map((point, index) => {
            return (
              <VictoryLabel
                key={index}
                textAnchor="start"
                verticalAnchor="middle"
                x={(index + 1) * 150 - 80}
                y={420}
                text={`${point.x}: ${point.y}%`}
                style={{ fontSize: 18, fill: 'black' }}
              />
            )
          })}
        </svg>
      </div>
    )
  }

  const renderChartEventSchedule = () => {
    return (
      <div>
        <svg width={400} height={500}>
          {/* VictoryPie component */}
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={dataEventSchedule}
            innerRadius={50}
            labelRadius={60}
            colorScale={['#5F8D4E', '#E25E3E']}
            style={{ labels: { fill: '#fff', fontSize: 15 } }}
            theme={VictoryTheme.material}
          />

          {/* VictoryLabel component for center text */}
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={200}
            y={380}
            text="Event Schedule Statistic"
            style={{ fontSize: 24 }}
          />

          {/* VictoryLabel components for data labels */}
          {dataEventSchedule.map((point, index) => {
            return (
              <VictoryLabel
                key={index}
                textAnchor="start"
                verticalAnchor="middle"
                x={(index + 1) * 150 - 80}
                y={420}
                text={`${point.x}: ${point.y}%`}
                style={{ fontSize: 18, fill: 'black' }}
              />
            )
          })}
        </svg>
      </div>
    )
  }

  const renderTableStatistic = () => {
    return (
      <div>
        <h3 className="title-content">List Schedule Statistic </h3>
        <LoadingProvider>
          <div className="p-3">
            <TableProvider
              data={fullDataSchedule.data}
              formatColumn={columns}
              paging={paging}
              setPaging={setPaging}
            />
          </div>
        </LoadingProvider>
      </div>
    )
  }

  return (
    <>
      <Box style={{ display: 'flex', justifyContent: 'space-between', margin: '0 150px' }}>
        {renderChartEduSchedule()}
        {renderChartEventSchedule()}
      </Box>
      <Box>{renderTableStatistic()}</Box>
    </>
  )
}

Statistic.propTypes = {}

export default React.memo(Statistic)
