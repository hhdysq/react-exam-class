type RoutersData = typeof routersData;
export type RoutersDataKeys = keyof RoutersData;

export const routersData = {
  login: {
    path: "/login",
    hasMenu: false,
  },
  adminManage: {
    path: "/adminManage",
    hasMenu: true,
  },

  corretExam: {
    path: "/corretExam",
    hasMenu: true,
  },
  corretExamList: {
    path: "/corretExamList",
    hasMenu: false,
  },
  exam: {
    path: "/exam/:examId",
    hasMenu: false,
  },
  examHistory: {
    path: "/examHistory",
    hasMenu: false,
  },
  examSelect: {
    path: "/examSelect",
    hasMenu: false,
  },
  personInfo: {
    path: "/personInfo",
    hasMenu: false,
  },
  readExam: {
    path: "/readExam",
    hasMenu: false,
  },
  studentManage: { path: "/studentManage", hasMenu: true },
  subjectManage: {
    path: "/subjectManage",
    hasMenu: true,
  },
  subjectAdd: {
    path: "/subjectAdd",
    hasMenu: false,
  },
  filePreview: {
    path: "/filePreview",
    hasMenu: false,
  },
};

export const studentManageMenu = [
  {
    label: "考题选择",
    key: "examSelect",
  },
  { label: "考试记录", key: "examHistory" },
];
export const adminManageMenu = [
  {
    label: "阅卷列表",
    key: "corretExamList",
  },
  {
    label: "考题管理",
    key: "subjectManage",
  },
  {
    label: "课程管理",
    key: "subjectManage",
  },
];
