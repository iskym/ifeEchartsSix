// JavaScript Document
$(function(){
		var myChart=echarts.init(document.getElementById('main'));
		myChart.showLoading();
$.get('js/six.txt', function (xml) {//les-miserables  six
    myChart.hideLoading();
	//console.log(myChart.dataTool);

    var graph = echarts.dataTool.gexf.parse(xml);
    var categories = [];
    for (var i = 0; i < 1; i++) {
        categories[i] = {
            name: '类目' + i
        };
    }
	console.log(graph.links);
    graph.nodes.forEach(function (node) {
        node.itemStyle = null;
        node.value = node.symbolSize;
        node.symbolSize /= 1.5;
        node.label = {
            normal: {
                show: node.symbolSize > 30
            }
        };
       // node.category = node.attributes.modularity_class;
	   node.category = 0;//跟 legend 联系在一起 legend 有几个，这边就有几个 数组；
    });
    option = {
        title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {//  map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组。
                return a.name;
            })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series : [
            {
                name: 'Les Miserables',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: categories,
                roam: true,
                label: {
                    normal: {
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                lineStyle: {
                    normal: {
                        color: 'source',
                        curveness: 0.3
                    }
                }
            }
        ]
    };

    myChart.setOption(option);
}, 'text');
		
	})