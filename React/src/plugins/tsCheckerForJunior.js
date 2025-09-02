module.exports = {
  rules: {
    // 타입스크립트 실수 체크
    'no-explicit-any': {
      meta: {
        type: 'problem',
        docs: {
          description: 'any 타입 사용을 지양하세요. 타입 안정성을 위해 명확한 타입을 선언하세요.',
        },
        messages: {
          noAny: 'any 타입 사용은 버그의 원인이 될 수 있습니다. 명확한 타입을 선언하세요.',
        },
      },
      create(context) {
        return {
          TSAnyKeyword(node) {
            context.report({
              node,
              messageId: 'noAny',
            });
          },
        };
      },
    },
    'no-props-type': {
      meta: {
        type: 'problem',
        docs: {
          description: '컴포넌트 props에 타입을 명확히 지정하세요.',
        },
        messages: {
          noPropsType: '컴포넌트 props에 타입을 명확히 지정하지 않으면 타입 안정성이 떨어집니다.',
        },
      },
      create(context) {
        return {
          FunctionDeclaration(node) {
            if (
              node.id &&
              node.id.name &&
              node.id.name[0] === node.id.name[0].toUpperCase() &&
              node.params.length > 0 &&
              !node.params[0].typeAnnotation
            ) {
              context.report({
                node,
                messageId: 'noPropsType',
              });
            }
          },
        };
      },
    },
    'no-ts-ignore': {
      meta: {
        type: 'problem',
        docs: {
          description: '타입스크립트 오류를 무시하지 마세요.',
        },
        messages: {
          noTsIgnore: '타입스크립트 오류를 무시하면 버그가 숨어 있을 수 있습니다.',
        },
      },
      create(context) {
        return {
          Program(node) {
            const comments = context.getSourceCode().getAllComments();
            comments.forEach((comment) => {
              if (comment.value.includes('@ts-ignore')) {
                context.report({
                  node: comment,
                  messageId: 'noTsIgnore',
                });
              }
            });
          },
          TSAsExpression(node) {
            if (node.typeAnnotation && node.typeAnnotation.type === 'TSAnyKeyword') {
              context.report({
                node,
                message: 'as any 사용을 지양하세요. 명확한 타입을 선언하세요.',
              });
            }
          },
        };
      },
    },
    'no-hooks-type': {
      meta: {
        type: 'problem',
        docs: {
          description: 'useState, useRef 등에서 타입을 명확히 지정하세요.',
        },
        messages: {
          noHooksType: 'useState, useRef 등에서 타입을 명확히 지정하지 않으면 타입 안정성이 떨어집니다.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            if ((node.callee.name === 'useState' || node.callee.name === 'useRef') && !node.typeParameters) {
              context.report({
                node,
                messageId: 'noHooksType',
              });
            }
          },
        };
      },
    },
    // 로직 실수 체크
    // no-console-log, no-direct-state-mutation, no-inner-component 등은 공식 ESLint/React 플러그인에서 제공하므로 커스텀 룰에서 제거
    // 6. 배열 직접 변경(불변성 위반) 검사
    'no-array-mutation': {
      meta: {
        type: 'problem',
        docs: {
          description: '배열을 직접 변경하지 마세요. 불변성을 유지하세요.',
        },
        messages: {
          arrayMutation:
            '배열을 직접 변경하면 예기치 않은 버그가 발생할 수 있습니다. spread 등 불변성 패턴을 사용하세요.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            const mutatingMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
            if (node.callee.type === 'MemberExpression' && mutatingMethods.includes(node.callee.property.name)) {
              context.report({
                node,
                messageId: 'arrayMutation',
              });
            }
          },
          AssignmentExpression(node) {
            if (
              node.left.type === 'MemberExpression' &&
              node.left.object.type === 'Identifier' &&
              node.left.property.type === 'Literal'
            ) {
              context.report({
                node,
                message: '배열의 요소를 직접 변경하지 마세요. 불변성 패턴을 사용하세요.',
              });
            }
          },
        };
      },
    },
    // 7. useState 초기값 타입 미지정 검사
    'no-usestate-type': {
      meta: {
        type: 'problem',
        docs: {
          description: 'useState 사용 시 타입을 명확히 지정하세요.',
        },
        messages: {
          noUseStateType: 'useState의 초기값에 타입을 명확히 지정하지 않으면 타입 추론 오류가 발생할 수 있습니다.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.name === 'useState' && !node.typeParameters) {
              context.report({
                node,
                messageId: 'noUseStateType',
              });
            }
          },
        };
      },
    },
    // 8. map/filter/reduce에서 key props 누락 검사 (이미 jsx-require-key에서 처리)
    // 9. useEffect 의존성 배열에 배열/객체 직접 참조 경고
    'no-effect-deps-object': {
      meta: {
        type: 'problem',
        docs: {
          description: 'useEffect 의존성 배열에 객체/배열을 직접 참조하지 마세요.',
        },
        messages: {
          effectDepsObject: 'useEffect 의존성 배열에 객체/배열을 직접 넣으면 불필요한 렌더링이 발생할 수 있습니다.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.name === 'useEffect' && node.arguments[1] && node.arguments[1].type === 'ArrayExpression') {
              node.arguments[1].elements.forEach((dep) => {
                if (dep.type === 'ArrayExpression' || dep.type === 'ObjectExpression') {
                  context.report({
                    node: dep,
                    messageId: 'effectDepsObject',
                  });
                }
              });
            }
          },
        };
      },
    },
    // 10. useRef로 배열 관리 시 타입 미지정 경고
    'no-useref-type': {
      meta: {
        type: 'problem',
        docs: {
          description: 'useRef 사용 시 타입을 명확히 지정하세요.',
        },
        messages: {
          noUseRefType: 'useRef에서 타입을 명확히 지정하지 않으면 타입 안정성이 떨어집니다.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.name === 'useRef' && !node.typeParameters) {
              context.report({
                node,
                messageId: 'noUseRefType',
              });
            }
          },
        };
      },
    },
    // 11. 배열 메서드 반환값 미사용 경고
    'no-array-method-unused': {
      meta: {
        type: 'problem',
        docs: {
          description: 'map/filter/reduce 등 배열 메서드의 반환값을 반드시 사용하세요.',
        },
        messages: {
          arrayMethodUnused: '배열 메서드의 반환값을 사용하지 않으면 의도한 동작이 아닐 수 있습니다.',
        },
      },
      create(context) {
        return {
          ExpressionStatement(node) {
            if (node.expression.type === 'CallExpression' && node.expression.callee.type === 'MemberExpression') {
              const arrMethods = ['map', 'filter', 'reduce'];
              if (arrMethods.includes(node.expression.callee.property.name)) {
                context.report({
                  node,
                  messageId: 'arrayMethodUnused',
                });
              }
            }
          },
        };
      },
    },
    // 12. 이벤트 핸들러에서 함수 래핑 누락 검사
    'no-event-handler-inline': {
      meta: {
        type: 'problem',
        docs: {
          description: 'onClick 등 이벤트 핸들러에 직접 함수 실행을 넣지 마세요.',
        },
        messages: {
          eventHandlerInline:
            '이벤트 핸들러에는 반드시 래핑된 함수(화살표 함수 등)를 사용하세요. 예: onClick={() => ...}',
        },
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (
              node.name.name &&
              /^on[A-Z]/.test(node.name.name) &&
              node.value &&
              node.value.type === 'JSXExpressionContainer' &&
              node.value.expression.type === 'CallExpression'
            ) {
              context.report({
                node,
                messageId: 'eventHandlerInline',
              });
            }
          },
        };
      },
    },
  },
};
