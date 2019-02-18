export default class Report {
data:any;
_plots:Array<any> = [];
constructor(json:JSON) {
	this.data = Object.assign({},json);
}
fetchPlotValues(plot:any) {
	// Extend .legends with 'value' field
	var vf = plot.valueField,
		lf = plot.legendField,
		legends:any = {};
	
	plot.legends.forEach((v:any)=>{// get keys index
		const key:string = v.name;
		legends[key] = Object.assign({value:0},v);
	});

	this.data.rows.forEach((row:any) => {
		row.subRows.forEach((sr:any) => {
			var key = sr.fields.find((v:any)=>{return v.id === lf});
			if(!key || !legends[key.value]) return;
			var val = sr.fields.find((v:any)=>{return v.id === vf});
			legends[key.value].value += val.value;
			//console.log(key.value, val.value);
		});
	});

	var legendsData:Array<any> = [];
	for(var key in legends) legendsData.push(legends[key]);
	return Object.assign(plot,{legendsData});
}
get plots() {
	if(!this._plots.length) {
		var plots = (this.data.viewSettings.plots || []);
		plots.forEach((plot:any) => this._plots.push(this.fetchPlotValues(plot)));
	}
	return this._plots;
}
};