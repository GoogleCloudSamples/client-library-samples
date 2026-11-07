// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START dataform_v1beta1_dataform_folder_update]

import (
	"context"
	"fmt"
	"io"

	dataform "cloud.google.com/go/dataform/apiv1beta1"
	dataformpb "cloud.google.com/go/dataform/apiv1beta1/dataformpb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateFolder method.
func updateFolder(ctx context.Context, w io.Writer, projectID string, locationID string, folderID string) error {
	folder := &dataformpb.Folder{
		Name:        fmt.Sprintf("projects/%s/locations/%s/folders/%s", projectID, locationID, folderID),
		DisplayName: "Updated Folder Name",
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"display_name"},
	}

	client, err := dataform.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &dataformpb.UpdateFolderRequest{
		Folder:     folder,
		UpdateMask: updateMask,
	}

	resp, err := client.UpdateFolder(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateFolder: %w", err)
	}

	fmt.Fprintf(w, "Updated folder: %s\n", resp.GetName())
	return nil
}

// [END dataform_v1beta1_dataform_folder_update]
