import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Switch from "@material-ui/core/Switch";
import Avatar from "@material-ui/core/Avatar";

const ProviderList = ({
    providerList,
    handleProviderListChange,
    selectedProviderList,
}) => {
    const [selectedProviderListTemp, setSelectedProviderListTemp] =
        useState(selectedProviderList);

    const handleProviderToggle = (provider_name) => {
        if (!selectedProviderListTemp.includes(provider_name)) {
            setSelectedProviderListTemp([
                ...selectedProviderListTemp,
                provider_name,
            ]);
        } else
            setSelectedProviderListTemp(
                selectedProviderListTemp.filter(
                    (provider) => provider !== provider_name
                )
            );
    };

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleDialogOpen = () => setIsDialogOpen(true);

    const handleDialogClose = () => setIsDialogOpen(false);

    const handleUpdateSelectedProviderList = () => {
        handleProviderListChange(selectedProviderListTemp);
        handleDialogClose();
    };

    return (
        <>
            <List>
                <ListItem
                    button
                    variant="outlined"
                    color="primary"
                    onClick={handleDialogOpen}
                    aria-label="provider list"
                >
                    Provider List
                </ListItem>
            </List>

            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="confirmation-dialog-title"
                open={isDialogOpen}
            >
                <DialogTitle id="confirmation-dialog-title">
                    Provider List
                </DialogTitle>
                <DialogContent dividers>
                    <List>
                        {providerList.map((provider) => {
                            return (
                                <ListItem key={provider.provider_id}>
                                    <ListItemAvatar>
                                        <Avatar />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={provider.provider_name}
                                    />
                                    <ListItemSecondaryAction>
                                        <Switch
                                            name={provider.provider_name}
                                            edge="end"
                                            onChange={() =>
                                                handleProviderToggle(
                                                    provider.provider_name
                                                )
                                            }
                                            checked={selectedProviderListTemp.includes(
                                                provider.provider_name
                                            )}
                                        />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={handleDialogClose}
                        color="primary"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleUpdateSelectedProviderList}
                        color="primary"
                    >
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

ProviderList.propTypes = {
    providerList: PropTypes.array,
    handleProviderListChange: PropTypes.func,
};

export default ProviderList;
