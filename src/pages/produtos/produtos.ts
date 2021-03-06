import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoriaId)
                       .subscribe(response => {
                         this.items = response['content'];
                         this.loadImageUrls();
                       },
                       error => {});
    
  }

  loadImageUrls() {

    for(var i=0; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
                         .subscribe(response => {
                           item.imageUrl = `${API_CONFIG.buckectBaseUrl}/prod${item.id}-small.jpg`;
                         },
                        error => {});
    }

  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutosDetailPage', {produto_id: produto_id});
  }

}
