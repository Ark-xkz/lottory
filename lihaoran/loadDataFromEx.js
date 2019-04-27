var reader = new FileReader();
	var fileExcel={
		"oldFile":"",
		"wb":undefined,
		"wb_sheetname":undefined,
		"wb_sheet":undefined,
		"table":undefined,
		"property":[],
	};
	function addLis() { //监听输入框，引入文件
		var xlf = document.getElementById('xlf');
		if(xlf.addEventListener) xlf.addEventListener('change', handleFile, false);
	}
 
	addLis();
 
	// 变量fileExcel赋值，获取文件
	function handleFile(e) {
		var files = e.target.files;
		fileExcel.oldFile = files[0];
		readFile(fileExcel.oldFile);
	}
 
	function readFile(file) {
		var name = file.name;
		reader.onload = function (e) {
			fileExcel.oldFile = e.target.result;
			fileExcel.wb = XLSX.read(fileExcel.oldFile, { type: "binary" });
			fileExcel.wb_sheetname = fileExcel.wb.SheetNames[0];
			fileExcel.wb_sheet = fileExcel.wb.Sheets[fileExcel.wb_sheetname];
		};
		reader.readAsBinaryString(file);
	}
	
	function myfunction(){ //不放函数里面是肯定快于文件监听器的，那样就会一直报错
		alert("景来function");
		var data = getTable(fileExcel.wb_sheet);
		fileExcel.table = data;
		alert("出来function");
		/*
		//var x = document.getElementById("tab");
		var strHtml = '';
		strHtml += '<tr>';
		//console.log(data);
        for (var key in data[0]) {
            strHtml += '<th>' + key + '</th>';
        }
        strHtml += '</tr>';
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            strHtml += '<tr>';
            for(var key in item){
                var value = item[key];
                strHtml += '<td>' + value + '</td>';
            }            
            strHtml += '</tr>';
        }
		x.innerHTML = strHtml;
		*/
	}
	
	
	function encodeCell(r, c) {
		return XLSX.utils.encode_cell({ r, c });
	}
	
	function getTable(ws) {
		const range = XLSX.utils.decode_range(ws['!ref']);
		var data = new Array();
		let h = range.s.r;
		var head = []; //数组
		if(h >= 0){  //列行都从0开始计数
			for (let hi = range.s.c; hi <= range.e.c; hi++) {
				head[hi] = ws[encodeCell(h, hi)].v;
				fileExcel.property[hi] = head[hi];
				//console.log(ws[encodeCell(h, hi)].v);
			}
		}
		
		
		for (let row = range.s.r +1; row <= range.e.r; row++){
			var rowData = [];
			for (let col = range.s.c; col <= range.e.c; col++) {
				rowData[head[col]] = ws[encodeCell(row, col)].v;
				//console.log(ws[encodeCell(row, col)].v);
			}
			data.push(rowData);
			//console.log(rowData);
		}
		//console.log(data);
		return data;
	}
	
	
	function saveXLSX() {
		console.log("保存表单");
		var mytable = fileExcel.table;
		for (var i = 0; i < mytable.length; i++) {
			var col = 2;
			fileExcel.wb_sheet[encodeCell(i+1, col)].v = mytable[i]['获奖情况'] ;
        }
		
		XLSX.writeFile(fileExcel.wb, 'output.xlsx');
	}
	
