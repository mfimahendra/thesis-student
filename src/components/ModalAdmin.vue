<script setup>


</script>

<template>
    <div class="modal fade" id="modal-primary" tabindex="-1" role="dialog" aria-labelledby="modal-primaryLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modal-primary-title">
                
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              
            </div>
            <div class="modal-footer">
              
            </div>
          </div>
        </div>
      </div>
</template>
<script>
export default {
    name: "ModalAdmin",
    props: {
        title: {
            type: String,
            default: "Title"
        },
        body: {
            type: String,
            default: "Body"
        },
        footer: {
            type: String,
            default: "Footer"
        }
    },
    data() {
        return {
            modal: null,
            modalTitle: '',
            modalBody: [],
            modalFooter: [],            
        }
    },
    
    mounted() {
        
    }
    
}
</script>

<style lang="">
    
</style>