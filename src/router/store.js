import { createStore } from 'vuex'
import pages from "$/static/data/pages.json";
import rows from "$/static/data/rows.json";
import elements from "$/static/data/elements.json";
import ctaItemTypes from '$/static/data/ctaItemTypes.json';
import multiItemTypes from '$/static/data/multiItemTypes.json';


const store = createStore({
  state: {
    modalInfo: {
      rowId: 0,
      columnId:  0,
      columnRowId: 0,
      formType: '',
      elementId: 0,
      paragraphId: 0,
    },
    isModalVisible: false,
    selectedElement: '',
    count: 1,
    pages: pages.pages,
    rows: rows.rows,
    elements: elements.elements,
    itemTypes: {
      CTAParagraph: ctaItemTypes,
      MultiColumn: multiItemTypes,
      ParagraphColumns: ctaItemTypes,
    }
  },
  getters: {
    getPageData: (state) => (url) => {
      return state.pages.find(page => page.url === url);
    },
    getPageElements: (state) => (id) => {
      return state.rows.filter(page => page.pageId === id).sort((a, b) => a.sorting - b.sorting);;
    },
    getElementData: (state) => (id) => {
      return state.elements.find(element => element.elementId === id);
    },
    getParagraphData: (state) => (id, paragraphId) => {
      return state.elements.find(element => element.elementId === id)?.data.ParagraphColumns.find(paragraph => paragraph.paragraphId === paragraphId);
    },
    getColumnConfig: (state) => (id, columnId) => {
      return state.rows.find(row => row.rowId === id).columns.find(column => column.columnId === columnId);
    },
    getRowById: (state) => (id) => {
      return state.rows.find(row => row.rowId === id).columns;
    },
    getItemtypes: (state) => (type) => {
      return state.itemTypes[type];
    },
    getModalInfo: (state) => {
      return state.modalInfo;
    },
    getCount: (state) => {
      return state.count;
    },
    modalState: (state) => {
      return state.isModalVisible;
    },
    getSelectedElement: (state) => {
      return state.selectedElement;
    }
  },
  mutations: {  
    increment (state) {
      state.count++
    },
    pageName(state, { id, name }) {
      state.pages.find(page => page.pageId === id).title = name;
    },
    pageType(state, { id, type }) {
      state.pages.find(page => page.id === id).pagetype = type;
    },
    toggleModal(state) {
      state.isModalVisible = !state.isModalVisible;
    },
    setSelectedElement(state, { element }) {
      state.selectedElement = element;
    },
    setModalInfo(state, { data }) {
      state.modalInfo.rowId = data.rowId || state.modalInfo.rowId;
      state.modalInfo.columnId = data.columnId || state.modalInfo.columnId;
      state.modalInfo.columnRowId = data.columnRowId || state.modalInfo.columnRowId;
      state.modalInfo.formType = data.formType || state.modalInfo.formType ;
      state.modalInfo.elementId = data.elementId || state.modalInfo.elementId;
      state.modalInfo.paragraphId = data.paragraphId || state.modalInfo.paragraphId;
    },

    addNewRow(state, { id, sorting }) {
      const newRow = new rowSchema('AdvancedGrid', id, sorting);
      state.rows.push(newRow);
      this.commit("increment");
    },
    editRow(state, { id, name }) {
      state.rows.find(row => row.rowId === id).name = name;
    },
    deleteRow(state, { id }) {
      const index = state.rows.findIndex(row => row.rowId === id);
      state.rows.splice(index, 1);
    },

    addNewColumn(state, { name, id, columnId, layoutStyling, rowConfig, data}) {
      let col = state.rows.find(row => row.rowId === id).columns.find(column => column.columnId === columnId);
      if(col != undefined) {
        col.name = data.name || 'Default Column';
        col.rows = rowConfig;
        col.styling = new stylingSchemaColumns(layoutStyling);
      }
      else {
        const newColumn = new columnSchema(name, rowConfig, layoutStyling);
        state.rows.find(row => row.rowId === id).columns.push(newColumn);      
        this.commit("increment");
      }
    },
    deleteColumn(state, { id, columnId }) {
      const targetRow = state.rows.find(row => row.rowId === id);
      let index = targetRow.columns.findIndex(column => column.columnId === columnId);
      let column = targetRow.columns[index];
      // also delete the elements in the column
      column.rows.forEach(row => {
        row.element.forEach(el => {
          let index = state.elements.findIndex(element => element.elementId === element.elementId);
          state.elements.splice(index, 1);
        });
      });
      targetRow.columns.splice(index, 1);
    },

    deleteColumnRow(state, { rowId, columnId, columnRowId }) {
      const targetRow = state.rows.find(row => row.rowId === rowId);
      const targetColumn = targetRow.columns.find(column => column.columnId === columnId);
      let index = targetColumn.rows.findIndex(row => row.columnRowId === columnRowId);
      let columnRow = targetColumn.rows[index];
      // also delete the element in the column row
      columnRow.element.forEach(el => {
        let index = state.elements.findIndex(element => element.elementId === element.elementId);
        state.elements.splice(index, 1);
      });
      targetColumn.rows.splice(index, 1);
    },

    addElementToColumn(state, { id, name, element, columnId, columnRowId, elementId, data, paragraphs }) {
      const newElement = new elementSchema(name, element);
      let dataFormatted = '';
      if(data.selectedElement === 'CTAParagraph') 
        dataFormatted = new formatDataCTA(data);
      if(data.selectedElement === 'MultiColumn') 
        dataFormatted = new formatDataMulti(data, paragraphs);

      if (state.elements.find(element => element.elementId === elementId) == undefined) {
        const targetRow = state.rows.find(row => row.rowId === id);
        const targetColumn = targetRow.columns.find(column => column.columnId === columnId);
        const targetRowInColumn = targetColumn.rows.find(row => row.columnRowId === columnRowId);
        targetRowInColumn.element.push(newElement);
        this.commit("saveElement", { name, dataFormatted, element});
        this.commit("increment");
      }
      else {
        this.commit("editElement", { elementId, name, dataFormatted, element});
      }
      state.modalInfo.elementId = -1;
    },  
    saveElement(state, { name, dataFormatted, element }) {
      state.elements.push({ elementId: state.count, name: name, data: dataFormatted, type: element});
    },
    editElement(state, { elementId, name, dataFormatted, elementType }) {
      let element = state.elements.find(element => element.elementId === elementId)
      element.data = dataFormatted;
      element.name = name || 'Defualt';
      element.type = elementType;
    },
    deleteElement(state, { id, columnId, columnRowId, elementId }) {
      const targetRow = state.rows.find(row => row.rowId === id);
      const targetColumn = targetRow.columns.find(column => column.columnId === columnId);
      const targetRowInColumn = targetColumn.rows.find(row => row.columnRowId === columnRowId);
      let index = targetRowInColumn.element.findIndex(element => element.elementId === elementId);
      targetRowInColumn.element.splice(index, 1);
      index = state.elements.findIndex(element => element.elementId === elementId);
      state.elements.splice(index, 1); 
    },

    addParagraphToMulti(state, { elementId, data, paragraphId }) {
      const newParagraph = new formatDataMultiParagraph(data);
      const targetElement = state.elements.find(element => element.elementId === elementId);
      targetElement.data.ParagraphColumns.find(paragraph => paragraph.paragraphId === paragraphId).data = newParagraph;
      this.commit("increment"); 
    },

    updateRows(state, { value }) {
      state.rows = value;
    },
    updateColumns(state, { id, data }) {
      state.rows.find(row => row.rowId === id).columns = data;
    }
  }
})

class formatDataCTA {
  constructor(data) {
    console.log(data);
    this.Height = data.Height || 0;
    this.ImagePosition = data.ImagePosition || false; 
    this.Fullwidth = data.Fullwidth === 'on' ? true : false || false;
    this.Clickable = data.Clickable === 'on' ? true : false || false;
    this.CenterVertical = data.CenterVertical === 'on' ? true : false || false;
    this.ImageAsBackground = data.ImageAsBackground === 'on' ? true : false || false;
    this.ParallaxImage = data.ParallaxImage === 'on' ? true : false || false;
    this.BackgroundConfigurationID = data.BackgroundConfigurationID || ''; 
    this.AnimateDirection = data.AnimateDirection || '';
    this.AnimateDuration = data.AnimateDuration || '';

    this.CssClass = data.CssClass || '';
    this.Header = [
      {
        ParagraphHeader: data.HeaderValue || '',
        HeaderStyle: data.HeaderType || '',
        VisualHeader: false
      }
    ],
    this.SubHeader = [
      {
        Subheader: data.SubHeaderValue || '',
        SubheaderStyle: data.SubHeaderType || '',
        VisualSubheader: false
      }
    ],
    this.Content = [
      {
        Content: data.Content || ''
      }
    ],
    this.Button = [
      {
        ButtonText: data.ButtonValue || '', 
        ButtonLink: data.ButtonUrl || '',
        Template: data.ButtonConfig || ''
      }
    ],
    this.ExtraButton = [
      { 
        ExtraButtonText: data.ExtraButtonValue || '',
        ExtraButtonLink: data.ExtraButtonUrl || '',
        Template: data.ExtraButtonConfig || ''
      }
    ],
    this.Image = [
      {
        ImageUrl: data.imageName || '',
      }
    ]
  }
}

class formatDataMulti {
  constructor(data, paragraphs) {
    this.Height = data.Height || 0;
    this.MobileHeight = data.MobileHeight || 0;
    this.ImagePosition = data.ImagePosition || '';
    this.Fullwidth = data.Fullwidth || false;
    this.Clickable = data.Clickable || false;
    this.CenterText = data.CenterText || false;
    this.WrapElements = data.WrapElements || false;
    this.ImageAsBackground = data.ImageAsBackground || false;
    this.ParallaxImage = data.ParallaxImage || false;
    this.BackgroundConfigurationID = data.BackgroundConfigurationID|| '';
    this.AnimateDirection = data.AnimateDirection || '';
    this.AnimateDuration = data.AnimateDuration || '';
    this.AnimateDelayColumns = data.AnimateDelayColumns || false;
    this.CssClass = data.CssClass || '';
    this.ParagraphHeader = [
      {
        ParagraphHeader: data.HeaderValue || '',
        HeaderStyle: data.HeaderType || '',
        VisualHeader: false
      }
    ],
    this.ParagraphColumns = paragraphs || [];
  }
}

class formatDataMultiParagraph {
  constructor(data) {
    this.name = data.name || 'Default paragraph';
    this.paragraphId = store.state.count;
    this.Header = [
      {
        ParagraphHeader: data.HeaderValue || '',
        HeaderStyle: data.HeaderType || '',
        VisualHeader: false
      }
    ],
    this.SubHeader = [
      {
        Subheader: data.SubHeaderValue || '',
        SubheaderStyle: data.SubHeaderType || '',
        VisualSubheader: false
      }
    ],
    this.Content = [
      {
        Content: data.Content || ''
      }
    ],
    this.Button = [
      {
        ButtonText: data.ButtonValue || '', 
        ButtonLink: data.ButtonUrl || '',
        Template: data.ButtonConfig || ''
      }
    ],
    this.ExtraButton = [
      { 
        ExtraButtonText: data.ExtraButtonValue || '',
        ExtraButtonLink: data.ExtraButtonUrl || '',
        Template: data.ExtraButtonConfig || ''
      }
    ],
    this.Image = [
      {
        ImageUrl: data.imageName || '',
      }
    ]
  }
}

class rowSchema {
  constructor(type, pageId, sorting) {
    this.type = type;
    this.name = 'Default Row';
    this.pageId = pageId;
    this.sorting = sorting;
    this.rowId = store.state.count;
    this.columns = [
      {
        type: "AdvancedGridColumn",
        name: "Default Column",
        columnId: store.state.count,
        active: true,
        rows: [
          {
              type: "AdvancedGridRow",
              name: "Default Row",
              columnRowId: store.state.count,
              element: []
          }   
        ]
      }
    ]
  }
}

class stylingSchemaColumns {
  constructor(layoutStyling) {
    this.flexShrink =  layoutStyling.flexShrink ||false;
    this.flexGrow = layoutStyling.flexGrow || false;
    this.flexBasis = layoutStyling.flexBasis || false; 
    this[layoutStyling.widthMinMax] = `${layoutStyling.columnWidth}px`;
    this.backgroundConfig = layoutStyling.backgroundConfig || '';
    this.padding = layoutStyling.paddingActive ? `${layoutStyling.padding.top || 0}px ${layoutStyling.padding.right || 0}px ${layoutStyling.padding.bottom || 0}px ${layoutStyling.padding.left || 0}px `: '';
  }
}

class columnSchema {
  constructor(name, rowConfig, layoutStyling) {
    this.type = "AdvancedGridColumn";
    this.name = name || 'Default Column';
    this.columnId = store.state.count;
    this.active = true;
    this.styling = new stylingSchemaColumns(layoutStyling);
    this.rows = rowConfig.map(row => ({ ...row }));
  }
}

class elementSchema {
  constructor(name, element) {
    this.type = element;
    this.name = name || element || 'Default Element';
    this.elementId = store.state.count;
  }
}

export default store
