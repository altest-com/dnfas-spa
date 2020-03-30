<template>

<split-view class="subject-details">
    <template v-slot:main>
        <subject-faces
            :subject-id="subjectId"
        ></subject-faces>

        <el-dialog
            title="Advertencia"
            :visible.sync="showDeleteDialog"
            width="400px"
            center
        >
            <p>
                ¿Seguro deseas eliminar este registro de forma permanente? 
                Se eliminará cualquier dato asociado.
            </p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showDeleteDialog = false">
                    Cancelar
                </el-button>
                <el-button 
                    type="primary" 
                    :disabled="loading"
                    @click="onConfirmDelete"
                >
                    Confirmar
                </el-button>
            </span>
        </el-dialog>
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'details'">
            <div class="text-lg text-w6">Detalles</div>
            <div class="flex-row">                
                <tool-button
                    class="ml-1"
                    tooltip="Editar sujeto" 
                    icon="el-icon-edit"
                    @click="onSubjectEdit"
                ></tool-button>
                <tool-button
                    class="ml-1"
                    tooltip="Eliminar sujeto" 
                    icon="el-icon-delete"
                    @click="showDeleteDialog = true"
                ></tool-button>
            </div>                 
        </template>

        <template v-else-if="panel === 'editor'">
            <div class="text-lg text-w6">Editor</div>
            <div class="flex-row">
                <tool-button
                    class="mx-1"
                    tooltip="Cancelar edición" 
                    icon="el-icon-close"
                    @click="onCancelSubjectEdit"
                ></tool-button>
            </div>                    
        </template>
    </template>

    <template v-slot:side-content>
        <subject-info
            v-if="panel === 'details'"
            :subject-id="subjectId"
        ></subject-info>

        <subject-editor
            v-else-if="panel === 'editor'"
            :edit="true" 
            :subject-id="subjectId"
            @confirm="onSubjectEditorConfirm"
        ></subject-editor>
    </template>
</split-view>

</template>

<script>
import ToolButton from '@/components/ToolButton';
import SplitView from '@/layout/components/SplitView';
import SubjectEditor from './SubjectEditor';
import SubjectInfo from './SubjectInfo';
import SubjectFaces from './SubjectFaces';

export default {
    name: 'SubjectDetails',

    components: {
        SplitView,
        SubjectEditor,
        SubjectInfo,
        ToolButton,
        SubjectFaces
    },

    props: {
        subjectId: {
            type: [String, Number],
            required: true
        }
    },

    data() {
        return {
            panel: 'details',
            showDeleteDialog: false,
            loading: false
        };
    },

    computed: {
    },

    methods: {

        onSubjectEdit() {
            this.panel = 'editor';         
        },

        onSubjectEditorConfirm(subjectId) {
            this.panel = 'details';           
        },

        onCancelSubjectEdit() {
            this.panel = 'details';
        },

        onConfirmDelete() {
            this.loading = true;
            this.$store.dispatch(
                'subjects/destroyItem', this.subjectId
            ).then(() => {
                this.$router.push({name: 'Subjectsindex'});
            });
        }
    }
};
</script>

<style lang="scss">
</style>
