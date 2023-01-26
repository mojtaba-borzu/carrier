export function ChangeGetSummaryInfoApi(data, defaultData) {
  const newData = defaultData.map((item) => ({
    id: item.id,
    label: item.label,
    persianLabel: item.persianLabel,
    count: data[item.label],
    image: item.image,
    color: item.color,
  }))

  return data && newData
}
