export const chooseValue = (selection, props) => {
  const { options, onValueClicked } = props;

  let select = selection.selectAll('select').data([null]);

  select = select //
    .enter()
    .append('select')
    .merge(select)
    .on('change', function () {
      onValueClicked(this.value);
    });

  const option = select.selectAll('option').data(options);

  option //
    .enter()
    .append('option')
    .merge(option)
    .attr('value', (data) => data)
    .text((data) => data);
};
