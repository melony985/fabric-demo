import { Icon } from 'common/antd/icon';
import { Layout } from 'common/antd/layout';
import { Menu } from 'common/antd/menu';
import { Link } from 'common/component/Link';
import { RadiumStyle } from 'common/component/radium_style';
import { Radium } from 'common/radium';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withAppState, WithAppState } from 'statistics/common/appStateStore';
import { Nav, NavProps } from '../common/publicData';
import { routes } from './routes';

const { Header, Content, Footer } = Layout;

@Radium
@observer
export class LayoutBaseView extends React.Component<RouteComponentProps<any> & WithAppState> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const pathArr = this.props.location.pathname.split('/');
        const selectedKeys = pathArr.length > 2 ? [pathArr.slice(0, 3).join('/')] : [`${this.props.location.pathname}`];

        return (
            <Layout>
                <RadiumStyle scopeSelector={['.statistics']}
                    rules={{
                        '#reactApp': {
                            backgroundColor: '#f0f2f5 !important',
                        },
                    }} />
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%', height: 'auto' }}>
                    <Menu
                        theme='dark'
                        mode='horizontal'
                        selectedKeys={selectedKeys}
                        style={{ lineHeight: '64px' }}
                        onClick={(item) => {
                            this.props.history.push(item.key.replace('.$', ''));
                        }}
                    >
                        {this.makeMenuItem(Nav[0].children, '/statistics')}
                    </Menu>
                </Header>
                <Content id='fixSelect' style={{ padding: '0 50px', marginTop: 64 }}>
                    <div style={{
                        minHeight: 380,
                        marginTop: '16px',
                        background: '#fff',
                        overflow: 'auto',
                    }}>
                        {routes}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                </Footer>
            </Layout>
        );
    }

    private makeMenuItem = (menuList: NavProps[], parentUrl?: string) => {
        return menuList.map((r: NavProps, i: number) => {
            const url = `${parentUrl || ''}/${r.url}`;
            const title = r.title;

            if (r.children && r.children.length > 0) {
                return (
                    <Menu.SubMenu
                        key={url}
                        title={<span>{title}</span>}
                    >
                        {this.makeMenuItem(r.children, url)}
                    </Menu.SubMenu>
                );
            }

            return (
                <Menu.Item key={url}>
                    <span>{title}</span>
                </Menu.Item>
            );
        });
    }

}

export const LayoutBase = withRouter(withAppState(LayoutBaseView));
