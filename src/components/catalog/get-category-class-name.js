function getCategoryClassName(id, activeId) {
    if (id === activeId && activeId === null) {
        return 'nav-link active';
    }

    const activeClass = id === +activeId ? 'active' : '';

    return `nav-link ${activeClass}`;
}

export default getCategoryClassName;
