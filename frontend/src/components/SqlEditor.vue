<template>
    <div>
        <textarea ref="sqlEditor"></textarea>
    </div>
</template>

<script>
export default {
    mounted() {
        const sqlEditor = this.$refs.sqlEditor;
        this.editor = CodeMirror.fromTextArea(sqlEditor, {
            mode: 'text/x-sql',
            lineNumbers: true,
            autofocus: true,
        });
    },
    beforeUnmount() {
        if (this.editor) {
            this.editor.toTextArea();
        }
    },
};
</script>

