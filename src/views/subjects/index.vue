<template>

<split-view class="subjects-index">
    <template v-slot:main>
        <list-header 
            class="mb-4"
            :show-count="subjects.length"
            :total-count="subjectsCount"
            add-text="Nuevo Sujeto"
            @create="onCreateSubject"
        ></list-header>

        <subjects-list 
            :auto-update="autoUpdate"
        ></subjects-list>
    </template>

    <template v-slot:side-actions>
        <template v-if="panel === 'search'">
            <div class="text-lg text-w6">Búsqueda</div>
            <tool-button
                class="ml-1"
                tooltip="Restablecer filtro" 
                icon="el-icon-refresh"
                @click="onClearFilterClick"
            ></tool-button>
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
        <subjects-filter 
            v-if="panel === 'search'"
        ></subjects-filter>

        <subject-editor
            v-else-if="panel === 'editor'"
            :edit="false" 
            :subject-id="newSubjectId"
            @confirm="onSubjectEditorConfirm"
        ></subject-editor>
    </template>
</split-view>

</template>

<script>
import { mapGetters } from 'vuex';
import ToolButton from '@/components/ToolButton';
import { subjectModel } from '@/store/modules/subjects/models';
import ListHeader from '@/components/ListHeader';
import SplitView from '@/layout/components/SplitView';
import SubjectsList from './components/SubjectsList';
import SubjectsFilter from './components/SubjectsFilter';
import SubjectEditor from './components/SubjectEditor';

const newSubjectId = 'newId';

export default {
    name: 'SubjectsIndex',

    components: {
        SplitView,
        SubjectsList,
        SubjectsFilter,
        SubjectEditor,
        ListHeader,
        ToolButton
    },

    data() {
        return {
            newSubjectId: newSubjectId,
            autoUpdate: false,
            panel: 'search',
            showDeleteDialog: false,
            loading: false
        };
    },

    computed: {
        ...mapGetters({
            subjects: 'subjects/sortedItems'
        }),
        subjectsCount() {
            return this.$store.state.subjects.count;
        }
    },

    created() {
        this.$store.dispatch('subjects/fetchItems');
    },

    methods: {

        onCreateSubject() {
            const subject = subjectModel.create();
            subject.id = this.newSubjectId;
            this.$store.dispatch('subjects/createItem', {
                item: subject,
                persist: false
            }).then(() => {
                this.panel = 'editor';
            });          
        },

        onSubjectEditorConfirm(subjectId) {
            this.panel = 'search';           
            this.$store.dispatch('subjects/fetchItems');           
        },

        onCancelSubjectEdit() {
            this.panel = 'search';
        },

        onClearFilterClick() {
            this.$store.dispatch('subjects/resetFilter');
            this.$store.dispatch('subjects/fetchItems');
        }
    }
};
</script>

<style lang="scss">
</style>
