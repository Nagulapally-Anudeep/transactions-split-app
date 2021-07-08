function upheapify(heap,idx){
    //heap=[{first:value,second:person}]
    if(idx===0)
    return;
    var pi = Math.floor((idx-1)/2);
    if(heap[idx].first > heap[pi].first){
        var temp=heap[idx];
        heap[idx]=heap[pi];
        heap[pi]=temp;
        upheapify(heap,pi);
    }else{
        return;
    }
}

function downheapify(heap,idx){
    var lc= 2*idx+1,rc=2*idx+2;
    if(lc>=heap.length && rc>=heap.length)
    return;
    var largest=idx;
    if(lc<heap.length && heap[largest].first<heap[lc].first){
        largest=lc;
    }
    if(rc<heap.length && heap[largest].first<heap[rc].first){
        largest=rc;
    }
    if(largest===idx)return;
    var temp=heap[idx];
    heap[idx]=heap[largest];
    heap[largest]=temp;
    downheapify(heap,largest);
}

function push_heap(heap,person,value){
    var ob = {"first":value , "second":person};
    heap.push(ob);
    upheapify(heap,heap.length-1);
}

function pop_heap(heap){
    if(heap.length===0)
    return;
    var i=heap.length-1;
    var temp=heap[0];
    heap[0]=heap[i];
    heap[i]=temp;
    heap.pop();
    downheapify(heap,0);
}

function heap_top(heap){
    if(heap.length===0)return;
    return heap[0];
}

export function split(transactions){
    //transactions=[{payer:,payee:,amount:},...]
    var net_balance={};  //hashmap to store each persons credit/debit
    for(var i=0;i<transactions.length;i++){
        var e=transactions[i];
        e.amount= Number(e.amount);
        //payer is under credit
        if(e.payer in net_balance){
            net_balance[e.payer] += e.amount;
        }else{
            net_balance[e.payer] = e.amount;
        }
        //payee is under debt
        if(e.payee in net_balance){
            net_balance[e.payee] -= e.amount;
        }else{
            net_balance[e.payee] = -e.amount; 
        }

    }
    var credit=[];
    var debit=[];
    for(const p in net_balance){
        if(net_balance[p]>0){
            push_heap(credit,p,net_balance[p]);
        }else{
            push_heap(debit,p,-1*net_balance[p]);
        }
    }

    var result=[]; //final simplified transactions
    while(credit.length>0){
        var p1= heap_top(credit);
        var p2= heap_top(debit);
        pop_heap(credit);
        pop_heap(debit);
        var ob = {"payer":p2.second, "payee":p1.second,"amount":Math.min(p1.first,p2.first)};
        result.push(ob);
        if(p1.first>p2.first){
            push_heap(credit,p1.second,p1.first-p2.first);
        }else if(p2.first>p1.first){
            push_heap(debit,p2.second,p2.first-p1.first);
        }
    }
    return result;
}
