function prepareQueryByParam(paramName, value) {
    const searchParams = new URLSearchParams(window.location.search);

    if (value) {
        searchParams.set(paramName, value);
    }
    if (!value) {
        searchParams.delete(paramName);
    }

    if (paramName === 'categoryId' || paramName === 'q') {
        searchParams.delete('offset');
    }

    return `?${searchParams.toString()}`;
}

export default prepareQueryByParam;
