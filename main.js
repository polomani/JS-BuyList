$(function() {
    var row_template = $(".row-template").html();
    var label_in_store_template = $(".label-in-store-template").html();
    var label_sold_template = $(".label-sold-template").html();
    
    var $input = $("#addField");
    
     $input.on('keypress', function (e) {
         if(e.which === 13){
            onInput();
         }
     });
    
    $("#add").click(onInput);
    
    function onInput () {
        var text = $input.val();
        if (text) {
            addOneItem(text);
            $input.val("");
            $input.focus();
        }
    }
    
    function addOneItem(text) {
        var $node = $(row_template);
        var $label_store = $(label_in_store_template);
        var $label_sold = $(label_sold_template);
        var quantity = 1;
        var $plus = $node.find(".btn-add");
        var $minus = $node.find(".btn-remove");
        var $delete = $node.find(".btn-delete");
        var $btnBought = $node.find(".btn-bought");
        var $btnUnBought = $node.find(".btn-unbought");
        var $counterLabel = $node.find(".counter-label");
        var $itemName = $node.find(".item-name");
        var $newItemName = $node.find(".new-item-name");
        $(".to-buy-items").append($node);
        $node.find(".item-name").text(text);
        $newItemName.val(text);
        $counterLabel.text(quantity);
        $label_store.find(".label-name").text(text);
        $label_sold.find(".label-name").text(text);
        $("#items-left-div").append($label_store);
        $("#items-sold-div").append($label_sold);
        
        $plus.click (function() {
            ++quantity;
            $counterLabel.text(quantity);
            $label_store.find(".number").text(quantity);
            $label_sold.find(".number").text(quantity);
            $minus.prop( "disabled", false);
        });
        $minus.click (function() {
            if (quantity>1)
            {
                --quantity;
                $counterLabel.text(quantity);
                $label_store.find(".number").text(quantity);
                $label_sold.find(".number").text(quantity);
                if (quantity==1) $minus.prop( "disabled", true);
            }
        }); 
        $delete.click(function() {
           $node.remove(); 
           $label_store.remove();
           $label_sold.remove();
        });
        $btnBought.click(function() {
           $node.removeClass("state-bought");
           $node.addClass("state-not-bought");
           $label_store.removeClass("state-bought");
           $label_store.addClass("state-not-bought");
           $label_sold.removeClass("state-bought");
           $label_sold.addClass("state-not-bought");
        });
        $btnUnBought.click(function() {
           $node.addClass("state-bought");
           $node.removeClass("state-not-bought");
           $label_store.addClass("state-bought");
           $label_store.removeClass("state-not-bought");
           $label_sold.addClass("state-bought");
           $label_sold.removeClass("state-not-bought");
        });
        $itemName.click(function() {
           $node.addClass("edit");
           $node.removeClass("no-edit");
           $newItemName.focus();
        });
        $newItemName.focusout(function() {
           $node.removeClass("edit");
           $node.addClass("no-edit");
            var text = $newItemName.val();
           $node.find(".item-name").text(text);
           $label_store.find(".label-name").text(text);
           $label_sold.find(".label-name").text(text);
        });
    }
    
    addOneItem("Помідори");
    addOneItem("Банани");
    addOneItem("Травинки");
});