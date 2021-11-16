/*
 * @Author: Admin_CXx
 * @Date:   2021-03-15 09:23:32
 * @Last Modified by:   Admin_CXx
 * @Last Modified time: 2021-03-15 12:34:18
 */
(function() {
    var oTargetDiv = document.getElementsByClassName('box-two')[0],
        oDragBox = document.getElementsByClassName('box-one')[0],
        dragEleArr = Array.from(oDragBox.children);
    var dragInitial = drag(dragEleArr);
    // one --> two
    dragInitial(oDragBox, oTargetDiv);
    // two --> one
    dragInitial(oTargetDiv, oDragBox);
}());

function drag(dragEleArr) {
    var dragDom = null; //记录拖拽元素
    dragEleArr.forEach(function(prev) {
        prev.ondragstart = function(e) {
            dragDom = e.target;
        };
    });
    return function(oDragBox, oTargetDiv) {
        oTargetDiv.ondragover = function(e) {
            e.preventDefault(); //拖拽结束阻止被拖拽元素返回原处，触发ondrop事件	
        };
        oTargetDiv.ondrop = function() {
            this.appendChild(dragDom);
            dragDom = null;
            if (!oDragBox.children.length) {
                oDragBox.innerText = '';
            }
        };
    };
}
